import { Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/socketEvents';
import { ReceiveMessage } from '@/types/message.type';
import { formatChannelData } from '@/utils/format';
import { Channel } from '@/types/channel.type';
import { User } from '@/types/user.type';
import { useChatStore } from '@/store/chatStore';
import useAuthStore from '@/store/authStore';
import queryClient from '@/utils/queryClient';

export interface Handlers {
  [SOCKET_EVENTS.MESSAGE]: (message: ReceiveMessage) => void;
  [SOCKET_EVENTS.CHANNEL_JOINED]: (channel: Channel) => void;
  [SOCKET_EVENTS.FETCH_CHANNELS]: (channels: Channel[]) => void;
  [SOCKET_EVENTS.CHANNEL_ADDED]: (channel: Channel) => void;
  [SOCKET_EVENTS.CHANNEL_CREATED]: (channel: Channel) => void;
  [SOCKET_EVENTS.CHANNEL_EXITED]: (channelId: Channel['channelId']) => void;
  [SOCKET_EVENTS.READ_COUNTED]: (
    messageId: ReceiveMessage['messageId']
  ) => void;
  [SOCKET_EVENTS.BROADCAST_CHANNEL_JOINED]: ({
    lastMessageId,
    channelId,
  }: {
    channelId: Channel['channelId'];
    lastMessageId: ReceiveMessage['messageId'];
  }) => void;
}

export function getSocketHandlers(socket: Socket): Handlers {
  const setState = useChatStore.getState().setState;

  return {
    [SOCKET_EVENTS.MESSAGE]: (message: ReceiveMessage) => {
      const channels = useChatStore.getState().channels;
      const currentChannelId = useChatStore.getState().currentChannelId;
      if (!currentChannelId) return;

      switch (message.type) {
        case 'exit':
          setState({
            channels: {
              [message.channelId]: {
                ...channels[message.channelId],
                users: channels[message.channelId].users.filter(
                  (user: User) => user.userId !== message.userId
                ),
              },
            },
          });
          break;
        case 'image':
        case 'text':
          setState({
            hasNewMessage: true,
          });
          break;
      }

      socket.emit('readMessage', {
        userId: useAuthStore.getState().userInfo.userId,
        messageId: message.messageId,
        channelId: message.channelId,
      });
    },
    [SOCKET_EVENTS.CHANNEL_JOINED]: (channel: Channel) => {
      const currentChannelId = useChatStore.getState().currentChannelId;
      const channels = useChatStore.getState().channels;
      if (!currentChannelId) return;

      const myUserId = useAuthStore.getState().userInfo?.userId;
      setState({
        channels: {
          ...channels,
          [channel.channelId]: formatChannelData(channel, myUserId),
        },
      });

      queryClient.invalidateQueries({
        queryKey: ['messages', { channelId: currentChannelId }],
      });
    },
    [SOCKET_EVENTS.FETCH_CHANNELS]: (channels: Channel[]) => {
      const myUserId = useAuthStore.getState().userInfo?.userId;
      setState({
        channels: channels.reduce(
          (acc, channel) => {
            acc[channel.channelId] = formatChannelData(channel, myUserId);
            return acc;
          },
          {} as Record<Channel['channelId'], Channel>
        ),
      });
    },
    [SOCKET_EVENTS.CHANNEL_ADDED]: (channel: Channel) => {
      const myUserId = useAuthStore.getState().userInfo?.userId;
      const channels = useChatStore.getState().channels;
      setState({
        channels: {
          ...channels,
          [channel.channelId]: formatChannelData(channel, myUserId),
        },
      });
    },
    [SOCKET_EVENTS.CHANNEL_CREATED]: (channel: Channel) => {
      setState({ currentChannelId: channel.channelId });
    },
    [SOCKET_EVENTS.CHANNEL_EXITED]: (channelId: Channel['channelId']) => {
      const channels = useChatStore.getState().channels;
      const messages = useChatStore.getState().messages;
      delete channels[channelId];
      delete messages[channelId];
      setState({
        channels,
        messages,
        currentChannelId: null,
      });
    },
    [SOCKET_EVENTS.READ_COUNTED]: () => {
      const currentChannelId = useChatStore.getState().currentChannelId;

      queryClient.invalidateQueries({
        queryKey: ['messages', { channelId: currentChannelId }],
      });
    },
    [SOCKET_EVENTS.BROADCAST_CHANNEL_JOINED]: () => {
      const currentChannelId = useChatStore.getState().currentChannelId;

      queryClient.invalidateQueries({
        queryKey: ['messages', { channelId: currentChannelId }],
      });
    },
  };
}
