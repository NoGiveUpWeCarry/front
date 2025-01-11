import { axiosInstance } from '@/apis/@core';
import { API_PATH } from '@/apis/api-path';
import { AuthRequest, AuthResponse, TokenResponse } from '@/types/auth.type';
import { RoleRequest, RoleResponse } from '@/types/role.type';
import axios from 'axios';

export const postAuthorizationCode = async ({
  authorizationCode,
  provider,
}: AuthRequest): Promise<AuthResponse> => {
  const apiPath = API_PATH.login.replace(':provider', provider);
  const response = await axios.post(
    `${import.meta.env.VITE_LOCAL_URL}${apiPath}`,
    {
      code: authorizationCode,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const fetchUserRole = async ({
  userRole,
}: RoleRequest): Promise<RoleResponse> => {
  try {
    const response = await axiosInstance.put<RoleResponse>(
      API_PATH.roleSelect,
      {
        role_id: userRole,
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
