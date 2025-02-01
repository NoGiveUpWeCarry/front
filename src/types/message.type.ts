import { Channel } from '@/types/channel.type';
import { User } from '@/types/user.type';

export type MessageTypes = 'image' | 'text' | 'exit';

export interface Message {
  type: MessageTypes;
  content: string;
  channelId: Channel['channelId'];
}

export interface SendMessage extends Message {
  userId: User['userId'];
}

export interface FileMessage extends Omit<SendMessage, 'content'> {
  content: File;
}

export interface ReceiveMessage extends Message {
  messageId: number;
  date: string;
  user: User;
  userId: User['userId'];
}

export interface LastMessage extends Message {
  messageId: number;
  date: string;
  userId: User['userId'];
}

export interface FetchChannelMessagesRequest {
  channelId: Channel['channelId'];
  limit: number;
  cursor: number | null;
  direction: 'forward' | 'backward';
}

export interface FetchChannelMessagesResponse {
  messages: ReceiveMessage[];
  cursors: {
    next: ReceiveMessage['messageId'] | null;
    prev: ReceiveMessage['messageId'] | null;
  };
}

export interface SearchChannelMessagesRequest {
  channelId: Channel['channelId'];
  limit: number;
  cursor: number | null;
  keyword: string;
  direction: 'forward' | 'backward';
}

export interface SearchChannelMessagesResponse {
  messages: ReceiveMessage[];
  cursors: {
    next: ReceiveMessage['messageId'] | null;
    prev: ReceiveMessage['messageId'] | null;
    search: ReceiveMessage['messageId'] | null;
  };
}
