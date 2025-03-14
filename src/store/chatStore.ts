import { SOCKET_EVENTS } from '@/constants/socketEvents';
import useAuthStore from '@/store/authStore';
import { Channel } from '@/types/channel.type';
import {
  SendMessage,
  ReceiveMessage,
  FileMessage,
  FetchChannelMessagesResponse,
} from '@/types/message.type';
import { formatChannelData } from '@/utils/format';
import queryClient from '@/utils/queryClient';
import { InfiniteData } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
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
  handleBroadcastChannelJoined: ({
    lastMessageId,
    channelId,
  }: {
    channelId: Channel['channelId'];
    lastMessageId: ReceiveMessage['messageId'];
  }) => void;
}

interface PageParam {
  cursors: {
    prev: number | null;
    next: number | null;
  };
  direction: 'backward' | 'forward';
}

// 에러 처리 함수
const alertSocketNotConnected = () => {
  throw new Error('소켓에 연결되어있지 않습니다.');
};

const alertLoginRequired = () => {
  throw new Error('로그인이 필요합니다.');
};

export const useChatStore = create<ChatState & ChatAction & Handlers>()(
  immer((set, get) => {
    // 핸들러 래퍼 함수 수정
    const withValidationCheck = <T extends any[]>(
      handler: (...args: T) => void
    ) => {
      return (...args: T) => {
        const { socket } = get();
        const user = useAuthStore.getState().userInfo;

        // 체크 순서: 로그인 -> 소켓 연결 -> 현재 채널
        if (!user) {
          console.error('User not logged in');
          alertLoginRequired();
          return;
        }

        if (!socket) {
          console.error('Socket not connected');
          alertSocketNotConnected();
          return;
        }

        return handler(...args);
      };
    };

    // 소켓 이벤트 핸들러 설정 수정
    const setupSocketEventHandlers = (socket: Socket) => {
      const {
        handleMessage,
        handleFetchChannels,
        handleChannelAdded,
        handleChannelJoined,
        handleChannelCreated,
        handleChannelExited,
        handleReadCounted,
        handleBroadcastChannelJoined,
      } = get();

      const handlers = {
        [SOCKET_EVENTS.MESSAGE]: withValidationCheck(handleMessage),
        [SOCKET_EVENTS.FETCH_CHANNELS]:
          withValidationCheck(handleFetchChannels),
        [SOCKET_EVENTS.CHANNEL_ADDED]: withValidationCheck(handleChannelAdded),
        [SOCKET_EVENTS.CHANNEL_JOINED]:
          withValidationCheck(handleChannelJoined),
        [SOCKET_EVENTS.CHANNEL_CREATED]:
          withValidationCheck(handleChannelCreated),
        [SOCKET_EVENTS.GROUP_CREATED]:
          withValidationCheck(handleChannelCreated),
        [SOCKET_EVENTS.CHANNEL_EXITED]:
          withValidationCheck(handleChannelExited),
        [SOCKET_EVENTS.READ_COUNTED]: withValidationCheck(handleReadCounted),
        [SOCKET_EVENTS.BROADCAST_CHANNEL_JOINED]: withValidationCheck(
          handleBroadcastChannelJoined
        ),
      };

      Object.entries(handlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    };

    // 소켓 이벤트 핸들러 제거
    const removeSocketEventHandlers = (socket: Socket) => {
      const {
        handleMessage,
        handleFetchChannels,
        handleChannelAdded,
        handleChannelJoined,
        handleChannelCreated,
        handleChannelExited,
        handleReadCounted,
        handleBroadcastChannelJoined,
      } = get();

      const handlers = {
        [SOCKET_EVENTS.MESSAGE]: withValidationCheck(handleMessage),
        [SOCKET_EVENTS.FETCH_CHANNELS]:
          withValidationCheck(handleFetchChannels),
        [SOCKET_EVENTS.CHANNEL_ADDED]: withValidationCheck(handleChannelAdded),
        [SOCKET_EVENTS.CHANNEL_JOINED]:
          withValidationCheck(handleChannelJoined),
        [SOCKET_EVENTS.CHANNEL_CREATED]:
          withValidationCheck(handleChannelCreated),
        [SOCKET_EVENTS.GROUP_CREATED]:
          withValidationCheck(handleChannelCreated),
        [SOCKET_EVENTS.CHANNEL_EXITED]:
          withValidationCheck(handleChannelExited),
        [SOCKET_EVENTS.READ_COUNTED]: withValidationCheck(handleReadCounted),
        [SOCKET_EVENTS.BROADCAST_CHANNEL_JOINED]: withValidationCheck(
          handleBroadcastChannelJoined
        ),
      };

      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };

    return {
      hasNewMessage: false,
      socket: null,
      messages: {},
      currentChannelId: null,
      channels: {},
      channelSearchKeyword: '',
      connectSocket: () => {
        // const socketUrl = `${import.meta.env.VITE_BASE_SERVER_URL}/chat`;
        const socketUrl = `${import.meta.env.VITE_LOCAL_URL}/chat`;
        const userId = useAuthStore.getState().userInfo?.userId;

        if (!userId) {
          alertLoginRequired();
          return;
        }

        const socket =
          get().socket ||
          io(socketUrl, {
            secure: true,
            rejectUnauthorized: false, // 로컬 자체 서명된 인증서의 경우 false 설정
            query: { userId },
          });

        setupSocketEventHandlers(socket);
        set(() => ({ socket }));
      },
      disconnectSocket: () => {
        const { socket } = get();
        if (!socket) return;

        removeSocketEventHandlers(socket);
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
      handleMessage: (message) => {
        const { socket, channels, currentChannelId } = get();
        if (!currentChannelId) return;

        set((state) => {
          if (message.type === 'exit') {
            state.channels[message.channelId] = {
              ...channels[message.channelId],
              users: channels[message.channelId].users.filter(
                (user) => user.userId !== message.userId
              ),
            };
          }
          state.hasNewMessage = true;
        });

        // 메시지 추가(깊은 복사를 해야 리렌더링이 유발됨.)
        queryClient.setQueriesData(
          { queryKey: ['messages', { channelId: currentChannelId }] },
          (oldData: InfiniteData<FetchChannelMessagesResponse, PageParam>) => {
            if (!oldData) return oldData;
            return {
              pages: oldData.pages.map((page, index) =>
                index === oldData.pages.length - 1
                  ? { ...page, messages: [...page.messages, message] }
                  : page
              ),
              pageParams: oldData.pageParams.map((param, index) =>
                index === oldData.pageParams.length - 1
                  ? {
                      ...param,
                      cursors: { ...param.cursors, prev: message.messageId },
                    }
                  : param
              ),
            };
          }
        );

        socket!.emit('readMessage', {
          userId: useAuthStore.getState().userInfo.userId,
          messageId: message.messageId,
          channelId: message.channelId,
        });
      },
      // 채널에 참가 했을 때 channels 상태 업데이트
      handleChannelJoined: (channel) => {
        const { currentChannelId } = get();
        if (!currentChannelId) return;

        const myUserId = useAuthStore.getState().userInfo?.userId;
        set((state) => {
          state.channels[channel.channelId] = formatChannelData(
            channel,
            myUserId
          );
        });

        queryClient.invalidateQueries({
          queryKey: ['messages', { channelId: currentChannelId }],
        });
      },
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
      handleChannelAdded: (channel) => {
        const myUserId = useAuthStore.getState().userInfo?.userId;
        set((state) => {
          state.channels[channel.channelId] = formatChannelData(
            channel,
            myUserId
          );
        });
      },
      handleChannelCreated: (channel) => {
        set(() => ({ currentChannelId: channel.channelId }));
      },
      handleChannelExited: (channelId) => {
        set((state) => {
          delete state.channels[channelId];
          delete state.messages[channelId];
          state.currentChannelId = null;
        });
      },
      handleReadCounted: () => {
        const { currentChannelId } = get();
        if (!currentChannelId) return;

        queryClient.invalidateQueries({
          queryKey: ['messages', { channelId: currentChannelId }],
        });
      },
      handleBroadcastChannelJoined: () => {
        const { currentChannelId } = get();
        if (!currentChannelId) return;

        queryClient.invalidateQueries({
          queryKey: ['messages', { channelId: currentChannelId }],
        });
      },
      setState: (state) => {
        set(() => ({ ...state }));
      },
    };
  })
);
