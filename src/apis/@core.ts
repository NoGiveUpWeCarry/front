import axios, { AxiosResponse } from 'axios';
import { API_PATH } from '@/apis/api-path';
import useAuth from '@/store/useAuth.store';
import { User } from '@/types/user.type';

interface RefreshRequest {
  user_id: Pick<User, 'user_id'>;
}

interface Message {
  code: number;
  text: string;
}

interface RefreshResopnse {
  message: Message;
  access_token: string;
}

axios.defaults.baseURL = import.meta.env.VITE_BASE_SERVER_URL;

export const axiosInstance = axios.create({
  withCredentials: true,
});

const getUserId = (): number | null => {
  const userInfo = useAuth.getState().userInfo;
  return userInfo?.user_id || null;
};

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log('updateToken 패칭 요청됨.');
        const user_id = useAuth.getState().userInfo?.id;
        const refreshResponse = await axios.post(API_PATH.updateToken, user_id);
        console.log('updateToken 패칭 실시됨.');
        const { accessToken } = refreshResponse.data;
        // 새 Access Token을 상태 저장소에 저장
        useAuth.getState().setAccessToken(accessToken);
        // 원래 요청을 다시 실행
        error.config.headers.Authorization = `Bearer ${accessToken}`;
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
