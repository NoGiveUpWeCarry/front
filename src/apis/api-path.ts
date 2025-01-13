export const API_PATH = {
  login: '/auth/:provider/callback',
  updateToken: '/auth/refresh',
  roleSelect: '/auth/roleselect',
  channels: '/channels',
  channel: '/channel/:channelId',
  channelMessages: '/channel/:channelId/messages',
  createGroup: '/channel/group',
};
