import { Role } from '@/types/role.type';

export type RoleId = Role.Artist | Role.Designer | Role.Programmer;
export type AuthProvider = 'github' | 'google' | 'pad';

export interface User {
  user_id: number;
  email: string;
  name: string;
  nickname: string;
  profile_url: string;
  auth_provider: AuthProvider;
  role_id: RoleId;
}
