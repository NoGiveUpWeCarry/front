import { User } from '@/store/useAuth';
import axios from 'axios';

export interface AuthResponse {
  accessToken: string;
  user: User;
  isExistingUser: boolean;
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
