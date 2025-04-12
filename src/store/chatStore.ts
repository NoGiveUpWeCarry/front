import useAuthStore from '@/store/authStore';
import { Channel } from '@/types/channel.type';
import { SendMessage, ReceiveMessage, FileMessage } from '@/types/message.type';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMessage[]>;
  hasNewMessage: boolean;
  currentChannelId: number | null;
  channels: Record<Channel['channelId'], Channel>;
  channelSearchKeyword: string;
}

export interface ChatAction {
  createChannel: (userId1: number, userId2: number) => void;
  createGroup: (userIds: number[], title: Channel['title']) => void;
  sendMessage(message: SendMessage): void;
  sendMessage(message: FileMessage): void;
  joinChannel: (userId: number, channleId: Channel['channelId']) => void;
  exitChannel: (userId: number, channleId: Channel['channelId']) => void;
  setChannelSearchKeyword: (keyword: string) => void;
  setState: (state: Partial<ChatState>) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set, get) => {
    return {
      hasNewMessage: false,
      socket: null,
      messages: {},
      currentChannelId: null,
      channels: {},
      channelSearchKeyword: '',
      setChannelSearchKeyword: (keyword) => {
        set((state) => {
          state.channelSearchKeyword = keyword;
        });
      },
      createChannel: (userId1, userId2) => {
        const { socket } = get();
        socket!.emit('createChannel', { userId1, userId2 });
      },
      createGroup: (userIds, title) => {
        const { socket } = get();
        const user = useAuthStore.getState().userInfo;

        socket!.emit('createGroup', {
          userIds: [user.userId, ...userIds],
          title,
          thumbnailURL: user?.profileUrl,
        });
      },
      sendMessage: (message) => {
        const { socket } = get();
        socket!.emit('sendMessage', message);
      },
      joinChannel: (userId, channelId) => {
        const { socket } = get();
        socket!.emit('joinChannel', { userId, channelId });
      },
      exitChannel: (userId, channelId) => {
        const { socket } = get();
        socket!.emit('exitChannel', { userId, channelId });
      },
      setState: (state) => {
        set(() => ({ ...state }));
      },
    };
  })
);
