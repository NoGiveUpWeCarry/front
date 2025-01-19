import { API_PATH } from '@/apis/api-path';
import useAuthStore from '@/store/authStore';
import { User } from '@/types/user.type';
import axios, { AxiosResponse } from 'axios';

interface RefreshRequest {
  userId: User['userId'];
}

interface Message {
  code: number;
  text: string;
}

interface RefreshResopnse {
  message: Message;
  accessToken: string;
}

axios.defaults.baseURL = import.meta.env.VITE_BASE_SERVER_URL;

export const axiosInstance = axios.create({
  withCredentials: true,
});

const getUserId = (): number | null => {
  const userInfo = useAuthStore.getState().userInfo;
  return userInfo?.userId || null;
};

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
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
        const userId = getUserId();
        if (!userId) {
          console.error('User ID가 존재하지 않습니다. 로그아웃 처리 중...');
          window.location.href = '/login';
          return await Promise.reject('User ID가 없습니다.');
        }
        const refreshResponse = await axios.post<RefreshResopnse>(
          axios.defaults.baseURL + API_PATH.updateToken,
          { userId }
        );
        const { accessToken } = refreshResponse.data;
        useAuthStore.getState().setAccessToken(accessToken);
        console.log('zustand에 업데이트');
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        console.log('원래 요청 다시 실행됨.');
        return await axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error('Refresh Token 만료:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
