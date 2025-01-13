import { User } from '@/types/user.type';

type MessageTypes = 'image' | 'text';

export interface Message {
  type: MessageTypes;
  content: string;
  channelId: string;
}

export interface SendMessage extends Message {
  userId: number;
}

export interface ReceiveMessage extends Message {
  date: string;
  user: User;
}
