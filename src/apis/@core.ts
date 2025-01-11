import axios, { AxiosResponse } from 'axios';
import { API_PATH } from '@/apis/api-path';
import useAuth from '@/store/useAuth.store';
import { User } from '@/types/user.type';

interface RefreshRequest {
  user_id: Pick<User, 'id'>;
}

interface Message {
  code: number;
  text: string;
}

interface RefreshResopnse {
  message: Message;
  access_token: string;
}

axios.defaults.baseURL = import.meta.env.VITE_LOCAL_URL;

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { message, ...rest } = response.data;
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log('updateToken 패칭 요청됨.');
        const user_id = useAuth.getState().userInfo?.id;
        console.log('user_id:', user_id);
        // getUserId 함수로 user_id 안전하게 가져오기
        if (!user_id) {
          console.error('User ID가 존재하지 않습니다. 로그아웃 처리 중...');
          window.location.href = '/login';
          return Promise.reject('User ID가 없습니다.');
        }

        const refreshResponse = await axios.post<
          RefreshRequest,
          AxiosResponse<RefreshResopnse>
        >(API_PATH.updateToken, { user_id });

        console.log('updateToken 패칭 실시됨.');
        const { access_token } = refreshResponse.data;

        // 새 Access Token을 상태 저장소에 저장
        useAuth.getState().setAccessToken(access_token);
        console.log('zustand에 업데이트');

        // 원래 요청을 다시 실행
        error.config.headers.Authorization = `Bearer ${access_token}`;
        console.log('원래 요청 다시 실행됨.');
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error('Refresh Token 만료:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
