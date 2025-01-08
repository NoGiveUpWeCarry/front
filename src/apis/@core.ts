import useAuth from '@/store/useAuth';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.BASE_SERVER_URL}`;

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
    response.data = {
      message,
      data: rest,
    };
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
