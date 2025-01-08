import { User } from '@/types/user.type';

export interface AuthRequest {
  authorizationCode: string;
  provider: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
  isExistingUser: boolean;
}
export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  userInfo: User | null;
}
export interface AuthAction {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUserRole: (userRole: number) => void;
  setAccessToken: (token: string) => void;
}
