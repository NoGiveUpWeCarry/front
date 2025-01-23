import useAuthStore from '@/store/authStore';
import { Channel } from '@/types/channel.type';
import { SendMessage, ReceiveMessage } from '@/types/message.type';
import { formatChannelData } from '@/utils/format';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMessage[]>;
  currentChannelId: number | null;
  channels: Record<Channel['channelId'], Channel>;
}

export interface ChatAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  createChannel: (userId1: number, userId2: number) => void;
  createGroup: (userIds: number[], title: Channel['title']) => void;
  sendMessage: (message: SendMessage) => void;
  joinChannel: (userId: number, channleId: Channel['channelId']) => void;
  setMessages: (
    messages: ReceiveMessage[],
    channelId: NonNullable<ChatState['currentChannelId']>
  ) => void;
}

export interface Handlers {
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
      messages: {},
      currentChannelId: null,
      channels: {},
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
            query: { userId: useAuthStore.getState().userInfo?.userId },
          });
        socket.on('message', handleMessage);
        socket.on('fetchChannels', handleFetchChannels);
        socket.on('channelAdded', handleChannelAdded);
        socket.on('channelJoined', handleChannelJoined);
        socket.on('channelCreated', handleChannelCreated);
        socket.on('groupCreated', handleChannelCreated);
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
        socket.off('groupCreated', handleChannelCreated);
        socket.disconnect();
        set(() => ({
          socket: null,
          currentChannelId: null,
          messages: {},
          channels: {},
        }));
      },
      createChannel: (userId1, userId2) => {
        const { socket } = get();
        if (!socket) return;
        socket.emit('createChannel', {
          userId1,
          userId2,
        });
      },
      createGroup: (userIds, title) => {
        const { socket } = get();
        const user = useAuthStore.getState().userInfo;
        if (!socket)
          return alert('소켓에 연결되어있지 않습니다. (createGroup)');
        socket.emit('createGroup', {
          userIds,
          title,
          thumbnailURL: user?.userImage,
        });
      },
      sendMessage: (message) => {
        const { socket } = get();
        if (!socket)
          return alert('소켓에 연결되어있지 않습니다. (sendMessage)');
        socket.emit('sendMessage', message);
      },
      // 채널 참가
      joinChannel: (userId, channelId) => {
        const { socket } = get();
        if (!socket)
          return alert('소켓에 연결되어있지 않습니다. (joinChannel)');
        socket.emit('joinChannel', { userId, channelId });
      },
      // http 로 받아온 메시지를 이용해 messages 상태 업데이트
      setMessages: (messages, channelId) => {
        set((state) => {
          if (!state.messages[channelId]) {
            state.messages[channelId] = [];
          }
          state.messages[channelId] = messages;
        });
      },
      // 메시지 받았을 때 messages 상태 업데이트
      handleMessage: (message) => {
        set((state) => {
          if (!state.messages[message.channelId]) {
            state.messages[message.channelId] = [];
          }
          state.messages[message.channelId].unshift(message);
        });
      },
      // 채널에 참가 했을 때 channels 상태 업데이트
      handleChannelJoined: (channel) => {
        const myUserId = useAuthStore.getState().userInfo?.userId;
        set((state) => {
          state.currentChannelId = channel.channelId;
          if (!state.messages[channel.channelId]) {
            state.messages[channel.channelId] = [];
          }
          state.channels[channel.channelId] = formatChannelData(
            channel,
            myUserId
          );
        });
      },
      // 채팅 페이지 입장시 채널 리스트 조회
      handleFetchChannels: (channels) => {
        const myUserId = useAuthStore.getState().userInfo?.userId;
        set((state) => {
          channels.forEach((channel) => {
            state.channels[channel.channelId] = formatChannelData(
              channel,
              myUserId
            );
          });
        });
      },
      // 채널이 추가되었을 때 실시간으로 채널 리스트에 추가
      handleChannelAdded: (channel) => {
        const myUserId = useAuthStore.getState().userInfo?.userId;
        set((state) => {
          state.channels[channel.channelId] = formatChannelData(
            channel,
            myUserId
          );
        });
      },
      // 채널 생성시 해당 채널 참가
      handleChannelCreated: (channel) => {
        const { joinChannel } = get();
        const user = useAuthStore.getState().userInfo;
        if (!user) return alert('로그인을 해주세요 (handleChannelCreated)');
        joinChannel(user.userId, channel.channelId);
      },
    };
  })
);
