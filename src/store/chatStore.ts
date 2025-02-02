import useAuthStore from '@/store/authStore';
import { Channel } from '@/types/channel.type';
import { SendMessage, ReceiveMessage, FileMessage } from '@/types/message.type';
import { formatChannelData } from '@/utils/format';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ChatState {
  socket: Socket | null;
  messages: Record<string, ReceiveMessage[]>;
  currentChannelId: number | null;
  channels: Record<Channel['channelId'], Channel>;
  channelSearchKeyword: string;
  updateNeeded: boolean;
}

export interface ChatAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  createChannel: (userId1: number, userId2: number) => void;
  createGroup: (userIds: number[], title: Channel['title']) => void;
  sendMessage(message: SendMessage): void;
  sendMessage(message: FileMessage): void;
  joinChannel: (userId: number, channleId: Channel['channelId']) => void;
  exitChannel: (userId: number, channleId: Channel['channelId']) => void;
  setChannelSearchKeyword: (keyword: string) => void;
  setState: (state: Partial<ChatState>) => void;
}

export interface Handlers {
  handleMessage: (message: ReceiveMessage) => void;
  handleChannelJoined: (channel: Channel) => void;
  handleFetchChannels: (channels: Channel[]) => void;
  handleChannelAdded: (channel: Channel) => void;
  handleChannelCreated: (channel: Channel) => void;
  handleChannelExited: (channelId: Channel['channelId']) => void;
  handleReadCounted: (messageId: ReceiveMessage['messageId']) => void;
  handleBroadcaseChannelJoined: ({
    lastMessageId,
    channelId,
  }: {
    channelId: Channel['channelId'];
    lastMessageId: ReceiveMessage['messageId'];
  }) => void;
}

export const useChatStore = create<ChatState & ChatAction & Handlers>()(
  immer((set, get) => {
    return {
      socket: null,
      messages: {},
      currentChannelId: null,
      channels: {},
      channelSearchKeyword: '',
      updateNeeded: false,
      connectSocket: () => {
        // const socketUrl = `${import.meta.env.VITE_BASE_SERVER_URL}/chat`;
        const socketUrl = `${import.meta.env.VITE_LOCAL_URL}/chat`;
        const {
          handleFetchChannels,
          handleMessage,
          handleChannelAdded,
          handleChannelCreated,
          handleChannelJoined,
          handleChannelExited,
          handleReadCounted,
          handleBroadcaseChannelJoined,
        } = get();
        const socket =
          get().socket ||
          io(socketUrl, {
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
        socket.on('channelExited', handleChannelExited);
        socket.on('readCounted', handleReadCounted);
        socket.on('broadcastChannelJoined', handleBroadcaseChannelJoined);
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
          handleChannelExited,
          handleReadCounted,
          handleBroadcaseChannelJoined,
        } = get();
        if (!socket) return;
        socket.off('message', handleMessage);
        socket.off('fetchChannels', handleFetchChannels);
        socket.off('channelAdded', handleChannelAdded);
        socket.off('channelJoined', handleChannelJoined);
        socket.off('channelCreated', handleChannelCreated);
        socket.off('groupCreated', handleChannelCreated);
        socket.off('channelExited', handleChannelExited);
        socket.off('readCounted', handleReadCounted);
        socket.off('broadcastChannelJoined', handleBroadcaseChannelJoined);
        socket.disconnect();
        set(() => ({
          socket: null,
          currentChannelId: null,
          messages: {},
          channels: {},
        }));
      },
      setChannelSearchKeyword: (keyword) => {
        set((state) => {
          state.channelSearchKeyword = keyword;
        });
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
        if (!socket) return alertSocketNotConnected();
        socket.emit('createGroup', {
          userIds: [user.userId, ...userIds],
          title,
          thumbnailURL: user?.profileUrl,
        });
      },
      sendMessage: (message) => {
        const { socket } = get();
        if (!socket) return alertSocketNotConnected();
        socket.emit('sendMessage', message);
      },
      // 채널 참가
      joinChannel: (userId, channelId) => {
        const { socket } = get();
        if (!socket) return alertSocketNotConnected();
        socket.emit('joinChannel', { userId, channelId });
      },
      // 채널 나가기
      exitChannel: (userId, channelId) => {
        const { socket } = get();
        if (!socket) return alertSocketNotConnected();
        socket.emit('exitChannel', { userId, channelId });
      },
      // 메시지 받았을 때 messages 상태 업데이트
      handleMessage: (message) => {
        const { socket } = get();
        set((state) => {
          if (!state.messages[message.channelId]) {
            state.messages[message.channelId] = [];
          }
          state.messages[message.channelId].push(message);
          socket!.emit('readMessage', {
            userId: useAuthStore.getState().userInfo.userId,
            messageId: message.messageId,
            channelId: message.channelId,
          });
        });
      },
      // 채널에 참가 했을 때 channels 상태 업데이트
      handleChannelJoined: (channel) => {
        const myUserId = useAuthStore.getState().userInfo?.userId;
        console.log({ channel });
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
        if (!user) return alertLoginRequired();
        joinChannel(user.userId, channel.channelId);
      },
      // 채팅방 나가기 완료 시 채팅방 목록에서 해당 채널 삭제
      handleChannelExited: (channelId) => {
        set((state) => {
          delete state.channels[channelId];
          delete state.messages[channelId];
          state.currentChannelId = null;
        });
      },
      // readCount 1 증가
      handleReadCounted: (messageId) => {
        const { currentChannelId } = get();
        set((state) => {
          state.messages[currentChannelId!] = state.messages[
            currentChannelId!
          ].map((message) => ({
            ...message,
            readCount:
              message.messageId === messageId
                ? message.readCount + 1
                : message.readCount,
          }));
        });
      },
      handleBroadcaseChannelJoined: () => {
        set((state) => {
          state.updateNeeded = true;
        });
      },
      setState: (state) => {
        set(() => ({ ...state }));
      },
    };
  })
);

function alertSocketNotConnected() {
  return alert('소켓에 연결되어있지 않습니다.');
}

function alertLoginRequired() {
  return alert('로그인을 해주세요');
}
