import { Role } from '@/types/role.type';

export type RoleId = Role.Artist | Role.Designer | Role.Programmer;
export type AuthProvider = 'github' | 'google' | 'pad';

export interface User {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  profileUrl: string;
  authProvider: AuthProvider;
  roleId: RoleId;
}
