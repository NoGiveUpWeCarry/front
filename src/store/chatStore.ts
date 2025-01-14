import useAuthStore from '@/store/authStore';
import { Channel } from '@/types/channel.type';
import { SendMessage, ReceiveMessage } from '@/types/message.type';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMessage[]>;
  currentChannelId: string | null;
  channels: Channel[];
}

interface ChatAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  createChannel: (userId1: number, userId2: number) => void;
  sendMessage: (message: SendMessage) => void;
  joinChannel: (userId: number, channleId: Channel['channelId']) => void;
  // joinGroup: (userIds: number[]) => void;
  setChannel: (channelId: Channel['channelId']) => void;
}

interface Handlers {
  handleMessage: (message: ReceiveMessage) => void;
  handleChannelJoined: (channel: Channel) => void;
  handleFetchChannels: (channels: Channel[]) => void;
  handleChannelAdded: (channel: Channel) => void;
  handleChannelCreated: (channel: Channel) => void;
}

export const useChatStore = create<ChatState & ChatAction & Handlers>()(
  immer((set, get) => {
    return {
      socket: null,
      messages: {}, //messages
      currentChannelId: null,
      channels: [],
      connectSocket: () => {
        const protocol = window.location.protocol;
        const {
          handleFetchChannels,
          handleMessage,
          handleChannelAdded,
          handleChannelCreated,
          handleChannelJoined,
        } = get();
        const socket =
          get().socket ||
          io(`${protocol}//localhost:8080/chat`, {
            secure: true,
            rejectUnauthorized: false, // 로컬 자체 서명된 인증서의 경우 false 설정
            query: { userId: useAuthStore.getState().userInfo?.user_id },
          });
        socket.on('message', handleMessage);
        socket.on('fetchChannels', handleFetchChannels);
        socket.on('channelAdded', handleChannelAdded);
        socket.on('channelCreated', handleChannelCreated);
        socket.on('channelJoined', handleChannelJoined);
        set(() => ({ socket }));
      },
      disconnectSocket: () => {
        const {
          socket,
          handleMessage,
          handleFetchChannels,
          handleChannelAdded,
          handleChannelJoined,
          handleChannelCreated,
        } = get();
        if (!socket) return;
        socket.off('message', handleMessage);
        socket.off('fetchChannels', handleFetchChannels);
        socket.off('channelAdded', handleChannelAdded);
        socket.off('channelJoined', handleChannelJoined);
        socket.off('channelCreated', handleChannelCreated);
        socket.disconnect();
        set(() => ({ socket: null }));
      },
      createChannel: (userId1, userId2) => {
        const { socket } = get();
        if (!socket) return;
        socket.emit('createChannel', {
          userId1,
          userId2,
        });
      },
      sendMessage: (message) => {
        const { socket } = get();
        if (!socket)
          return alert('소켓에 연결되어있지 않습니다. (sendMessage)');
        socket.emit('sendMessage', message);
      },
      joinChannel: (userId, channelId) => {
        const { socket } = get();
        if (!socket)
          return alert('소켓에 연결되어있지 않습니다. (joinChannel)');
        socket.emit('joinChannel', { userId, channelId });
      },
      setChannel: (channelId) => {
        const { joinChannel } = get();
        const user = useAuthStore.getState().userInfo;
        if (!user) return alert('로그인을 해주세요 (setChannel)');
        joinChannel(user.user_id, channelId);
        set(() => ({ currentChannelId: channelId }));
      },
      handleMessage: (message) => {
        console.log('handleMessage >>>', message);
        message.user.user_id = message.user.id;
        set((state) => {
          if (!state.messages[message.channelId]) {
            state.messages[message.channelId] = [];
          }
          state.messages[message.channelId].push(message);
        });
      },
      handleChannelJoined: (channel) => {
        console.log('channelJoined >>> ', channel.channelId);
        set(() => ({ currentChannelId: channel.channelId }));
      },
      handleFetchChannels: (channels) => {
        set(() => ({ channels }));
      },
      handleChannelAdded: (channel) => {
        set((state) => {
          const isExistChannel = state.channels.some(
            (ch) => ch.channelId === channel.channelId
          );
          if (isExistChannel) return;
          state.channels.push(channel);
        });
      },
      handleChannelCreated: (channel) => {
        const { joinChannel } = get();
        const user = useAuthStore.getState().userInfo;
        if (!user) return alert('로그인을 해주세요 (handleChannelCreated)');
        joinChannel(user.user_id, channel.channelId);
      },
    };
  })
);
