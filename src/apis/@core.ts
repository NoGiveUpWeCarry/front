import axios from 'axios';
import useAuth from '@/store/useAuth';
import { API_PATH } from '@/apis/api-path';

axios.defaults.baseURL = import.meta.env.BASE_SERVER_URL;

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
        // Refresh Token으로 Access Token 갱신
        console.log('updateToken 패칭 요청됨.');
        const refreshResponse = await axiosInstance.post(API_PATH.updateToken);
        console.log('updateToken 패칭 실시됨.');
        const { accessToken } = refreshResponse.data;
        // 새 Access Token을 상태 저장소에 저장
        useAuth.getState().setAccessToken(accessToken);
        // 원래 요청을 다시 실행
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error('Refresh Token 만료:', refreshError);
        // 사용자를 로그인 페이지로 리디렉션
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
