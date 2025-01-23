import { LastMessage, ReceiveMessage } from '@/types/message.type';
import { User } from '@/types/user.type';

export type ChannelTypes = 'group' | 'private';

export interface Channel {
  channelId: number;
  title: string;
  type: ChannelTypes;
  thumbnailURL?: string; // 기본 이미지 필요
  users: User[];
  lastMessage: LastMessage;
}

// 그룹 채팅
export interface GroupChannel extends Channel {}

// 개인 채팅
export interface PersonalChannel extends Channel {}

export interface MockChannel extends Channel {
  messages: ReceiveMessage[];
}
