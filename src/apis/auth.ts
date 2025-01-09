import { API_PATH } from '@/apis/api-path';
import { AuthRequest, AuthResponse, TokenResponse } from '@/types/auth.type';
import { RoleRequest, RoleResponse } from '@/types/role.type';
import fetcher from '@/utils/fetcher';
import axios from 'axios';

export const postAuthorizationCode = async ({
  authorizationCode,
  provider,
}: AuthRequest): Promise<AuthResponse> => {
  const apiPath = API_PATH.login.replace(':provider', provider);
  const response = await axios.post(apiPath, {
    code: authorizationCode,
  });
  return response.data;
};

export const fetchUserRole = async ({
  userRole,
}: RoleRequest): Promise<RoleResponse> => {
  const response = await fetcher<RoleResponse>({
    url: API_PATH.roleSelect,
    method: 'PUT',
    data: {
      role_id: userRole,
    },
  });
  return response.data;
};

export const updateAccessToken = async (): Promise<TokenResponse> => {
  const response = await fetcher<TokenResponse>({
    url: API_PATH.updateToken,
    method: 'POST',
  });

  return response.data;
};
