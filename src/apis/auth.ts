import { axiosInstance } from '@/apis/@core';
import { API_PATH } from '@/apis/api-path';
import { AuthRequest, AuthResponse } from '@/types/auth.type';
import { RoleRequest, RoleResponse } from '@/types/role.type';

export const postAuthorizationCode = async ({
  authorizationCode,
  provider,
}: AuthRequest): Promise<AuthResponse> => {
  const apiPath = API_PATH.login.replace(':provider', provider);
  const response = await axiosInstance.post(apiPath, {
    code: authorizationCode,
  });
  return response.data;
};

export const fetchUserRole = async ({
  userRole,
}: RoleRequest): Promise<RoleResponse> => {
  const response = await axiosInstance.put(API_PATH.roleSelect, {
    role_id: userRole,
  });
  return response.data;
};
