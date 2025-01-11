// import { messages, channels } from '@/mock/chat.mock';
import { Channel, SendMessage, ReceiveMeesage } from '@/types/chat.type';
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
        const socket =
          get().socket ||
          io('https://localhost:4000', {
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
      joinChannel: (channelId) => {
        const { socket } = get();
        if (socket) {
          socket.emit('joinChannel', channelId);
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
