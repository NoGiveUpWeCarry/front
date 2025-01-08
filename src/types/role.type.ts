import { User } from '@/types/user.type';

export enum Role {
  Programmer = 1,
  Artist = 2,
  Designer = 3,
}

export interface RoleRequest {
  userRole: number;
}

export interface RoleResponse {
  message: {
    code: number;
    text: string;
  };
  user: User;
}
