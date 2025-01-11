import { User } from '@/types/user.type';

export interface Channel {
  id: string;
  channelThumbnailURL?: string; // 기본 이미지 필요
  users: User[];
  lastSendTime: string;
  title: string;
}

// 그룹 채팅
export interface GroupChannel extends Channel {}

// 개인 채팅
export interface PersonalChannel extends Channel {}

// 종료된 채팅

type MessageTypes = 'image' | 'text';

export interface SendMessage {
  type: MessageTypes;
  content: string;
  user: User;
  channelId: string;
}

export interface ReceiveMeesage extends SendMessage {
  date: string;
}

// export type MessageResponse = Required<Message>;

export type Sender = Pick<User, 'id' | 'nickname' | 'profile_url' | 'role_id'>;
