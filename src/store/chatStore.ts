import useAuthStore from '@/store/authStore';
import { SendMessage, ReceiveMessage } from '@/types/message.type';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMessage[]>;
  currentChannelId: string | null;
}

interface ChatAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (message: SendMessage) => void;
  joinChannel: (userId1: number, userId2: number) => void;
  // joinGroup: (userIds: number[]) => void;
  setChannel: (channelId: string) => void;
  handleMessage: (message: ReceiveMessage) => void;
  handleChannelJoined: ({ channelId }: { channelId: string }) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set, get) => {
    return {
      socket: null,
      messages: {}, //messages
      currentChannelId: null,
      connectSocket: () => {
        const protocol = window.location.protocol;
        const { handleChannelJoined, handleMessage } = get();
        const socket =
          get().socket ||
          io(`${protocol}//localhost:8080/chat`, {
            secure: true,
            rejectUnauthorized: false, // 로컬 자체 서명된 인증서의 경우 false 설정
            query: { userId: useAuthStore.getState().userInfo?.user_id },
          });
        socket.on('message', handleMessage);
        socket.on('channelJoined', handleChannelJoined);
        set(() => ({ socket }));
      },
      disconnectSocket: () => {
        const { socket, handleMessage, handleChannelJoined } = get();
        if (!socket) return;
        socket.off('message', handleMessage);
        socket.off('channelJoined', handleChannelJoined);
        socket.disconnect();
        set(() => ({ socket: null }));
      },
      sendMessage: (message) => {
        const { socket } = get();
        if (socket) {
          socket.emit('sendMessage', message);
        }
      },
      handleMessage: (message) => {
        console.log('handleMessage >>>', message); //
        message.user.user_id = message.user.id;
        set((state) => {
          if (!state.messages[message.channelId]) {
            state.messages[message.channelId] = [];
          }
          state.messages[message.channelId].push(message);
        });
      },
      handleChannelJoined: ({ channelId }) => {
        console.log('channelJoined >>> ', channelId);
        set(() => ({ currentChannelId: channelId }));
      },
      joinChannel: (userId1, userId2) => {
        const { socket } = get();
        if (!socket) return;
        socket.emit('joinChannel', {
          userId1,
          userId2,
        });
      },
      setChannel: (channelId) => {
        set(() => ({ currentChannelId: channelId }));
      },
    };
  })
);
