import { User } from '@/types/user.type';

export interface AuthRequest {
  authorizationCode: string;
  provider: string;
}
export interface AuthResponse {
  message: {
    code: number;
    text: string;
  };
  accessToken: string;
  user: User;
  isExistingUser: boolean;
}
export interface TokenResponse {
  accessToken: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  userInfo: User;
}
export interface AuthAction {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUserRole: (userRole: number) => void;
  setAccessToken: (token: string) => void;
}

export interface SignupBody {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
