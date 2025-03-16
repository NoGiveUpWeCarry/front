export const SOCKET_EVENTS = {
  MESSAGE: 'message',
  FETCH_CHANNELS: 'fetchChannels',
  CHANNEL_ADDED: 'channelAdded',
  CHANNEL_JOINED: 'channelJoined',
  CHANNEL_CREATED: 'channelCreated',
  GROUP_CREATED: 'groupCreated',
  CHANNEL_EXITED: 'channelExited',
  READ_COUNTED: 'readCounted',
  BROADCAST_CHANNEL_JOINED: 'broadcastChannelJoined',
} as const;
