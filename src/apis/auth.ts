import { API_PATH } from '@/apis/api-path';
import { AuthRequest, AuthResponse } from '@/types/auth.type';
import { RoleRequest, RoleResponse } from '@/types/role.type';
import { FetcherResponse, fetcher } from '@/utils/fetcher';

export const postAuthorizationCode = async ({
  authorizationCode,
  provider,
}: AuthRequest): Promise<FetcherResponse<AuthResponse>> => {
  const apiPath = API_PATH.login.replace(':provider', provider);
  return fetcher<AuthResponse>({
    url: apiPath,
    method: 'POST',
    data: { code: authorizationCode },
  });
};

export const fetchUserRole = async ({
  userRole,
}: RoleRequest): Promise<FetcherResponse<RoleResponse>> => {
  return fetcher<RoleResponse>({
    url: API_PATH.roleSelect,
    method: 'PUT',
    data: { role_id: userRole },
  });
};
