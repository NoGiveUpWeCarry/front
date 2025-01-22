import { Role } from '@/types/role.type';

export type RoleId = Role.Artist | Role.Designer | Role.Programmer;
export type AuthProvider = 'github' | 'google' | 'pad';

export interface User {
  authProvider: AuthProvider;
  email: string;
  name: string;
  nickname: string;
  userImage: string;
  roleId: number;
  userId: number;
}
