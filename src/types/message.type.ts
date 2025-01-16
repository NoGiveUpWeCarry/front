import { Channel } from '@/types/channel.type';
import { User } from '@/types/user.type';

type MessageTypes = 'image' | 'text';

export interface Message {
  messageId: number;
  type: MessageTypes;
  content: string;
  channelId: Channel['channelId'];
}

export interface SendMessage extends Message {
  userId: User['userId'];
}

export interface ReceiveMessage extends Message {
  date: string;
  user: User;
}
