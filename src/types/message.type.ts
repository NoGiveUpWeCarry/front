import { User } from '@/types/user.type';

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
