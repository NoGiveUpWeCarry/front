// import { messages, channels } from '@/mock/chat.mock';
import { SendMessage, ReceiveMeesage } from '@/types/message.type';
import { Channel } from 'diagnostics_channel';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMeesage[]>;
  channels: Channel[];
  currentChannelId: string;
}

interface ChatAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (message: Omit<SendMessage, 'channelId'>) => void;
  joinChannel: (channelId: string) => void;
  setChannel: (channelId: string) => void;
  startPrivateChat: (userId: string) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set, get) => {
    const handleMessage = (message: ReceiveMeesage) => {
      set((state) => {
        if (!state.messages[message.channelId]) {
          state.messages[message.channelId] = [];
        }
        state.messages[message.channelId].push(message);
      });
    };
    return {
      socket: null,
      messages: {}, //messages
      channels: [], //channels
      currentChannelId: 'ch1',
      connectSocket: () => {
        const protocol = window.location.protocol;
        const socket =
          get().socket ||
          io(`${protocol}//localhost:8080/chat`, {
            secure: true,
            rejectUnauthorized: false, // 로컬 자체 서명된 인증서의 경우 false 설정
          });
        socket.on('message', handleMessage);
        set(() => ({ socket }));
      },
      disconnectSocket: () => {
        const socket = get().socket;
        if (!socket) return;
        socket.off('message', handleMessage);
        socket.disconnect();
        set(() => ({ socket: null }));
      },
      sendMessage: (message) => {
        const { socket, currentChannelId } = get();
        if (socket) {
          socket.emit('sendMessage', {
            ...message,
            channelId: currentChannelId,
          });
        }
      },
      startPrivateChat: (userId) => {
        const { socket } = get();
        if (!socket) return;
        socket.emit('private', userId);
      },
      joinChannel: (channelId) => {
        const { socket } = get();
        if (socket) {
          socket.emit('joinChannel', {
            channelId,
            userId:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0',
          });
        }
      },
      setChannel: (channelId) => {
        set((state) => {
          state.currentChannelId = channelId;
        });
      },
    };
  })
);
