import { User } from '@/store/useAuth';
import axios from 'axios';

export interface GoogleAuthResponse {
  accessToken: string;
  user: User;
  isExistingUser: boolean;
}

export const postGoogleAuth = async (
  authorizationCode: string
): Promise<GoogleAuthResponse> => {
  const response = await axios.post(
    'http://localhost:8080/auth/google/callback',
    {
      code: authorizationCode,
    }
  );
  return response.data;
};
