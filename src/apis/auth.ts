import { axiosInstance } from '@/apis/@core';
import { User } from '@/store/useAuth';
import axios from 'axios';

export interface AuthResponse {
  accessToken: string;
  user: User;
  isExistingUser: boolean;
}

export interface RoleResponse {
  message: {
    code: number;
    text: string;
  };
  user: User;
}

export const postAuthorizationCode = async (
  authorizationCode: string,
  provider: string
): Promise<AuthResponse> => {
  const response = await axios.post(
    `http://localhost:8080/auth/${provider}/callback`,
    {
      code: authorizationCode,
    }
  );
  return response.data;
};

export const fetchUserRole = async (
  userRole: number
): Promise<RoleResponse> => {
  const response = await axiosInstance.put(
    `http://localhost:8080/auth/roleselect`,
    {
      role_id: userRole,
    }
  );
  console.log('fetchUserRole 호출:' + response.data);
  return response.data;
};
