import { API_PATH } from '@/apis/api-path';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import fetcher from '@/utils/fetcher';

export const fetchChannel = async (channelId: Channel['channelId']) => {
  const apiPath = API_PATH.channel.replace(':channelId', channelId.toString());
  const response = await fetcher<{ channel: Channel }>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchChannelMessages = async (channelId: Channel['channelId']) => {
  const apiPath = API_PATH.channelMessages.replace(
    ':channelId',
    channelId.toString()
  );
  const response = await fetcher<{ messages: ReceiveMessage[] }>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};
