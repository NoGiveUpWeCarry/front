import { axiosInstance } from '@/apis/@core';
import { API_PATH } from '@/apis/api-path';
import {
  AuthRequest,
  AuthResponse,
  LoginBody,
  SignupBody,
  TokenResponse,
} from '@/types/auth.type';
import { RoleRequest, RoleResponse } from '@/types/role.type';
import { User } from '@/types/user.type';
import fetcher from '@/utils/fetcher';
import axios from 'axios';

export const postAuthorizationCode = async ({
  authorizationCode,
  provider,
}: AuthRequest): Promise<AuthResponse> => {
  const apiPath = API_PATH.login.replace(':provider', provider);
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_SERVER_URL}${apiPath}`,
    {
      code: authorizationCode,
    },
    {
      withCredentials: true,
    }
  );
  console.log('post authorizationtoken response: ', response.data);
  return response.data;
};

export const fetchUserRole = async ({
  userRole,
}: RoleRequest): Promise<RoleResponse> => {
  try {
    const response = await axiosInstance.put<RoleResponse>(
      API_PATH.roleSelect,
      {
        roleId: userRole,
      }
    );
    return response.data;
  } catch (error) {
    console.error('유저 롤 변경 중 오류 발생:', error);
    throw error;
  }
};

export const updateAccessToken = async (): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post<TokenResponse>(
      API_PATH.updateToken
    );
    return response.data;
  } catch (error) {
    console.error('Access Token 갱신 중 오류 발생:', error);
    throw error;
  }
};

export const signup = async (signupBody: SignupBody) => {
  const response = await fetcher({
    method: 'POST',
    url: '/auth/signup',
    data: signupBody,
  });
  return response.data;
};

export const login = async (loginBody: LoginBody) => {
  const response = await fetcher<{ user: User; accessToken: string }>({
    method: 'POST',
    url: '/auth/login',
    data: loginBody,
  });
  return response.data;
};

export const logout = async () => {
  const response = await fetcher({
    method: 'POST',
    url: '/auth/logout',
  });
  return response.data;
};
