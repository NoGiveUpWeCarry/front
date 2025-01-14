import { API_PATH } from '@/apis/api-path';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import fetcher from '@/utils/fetcher';

export const fetchAllChanels = async () => {
  const apiPath = API_PATH.channels;
  const response = await fetcher<Channel[]>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchChannel = async ({ id }: Channel) => {
  const apiPath = API_PATH.channel.replace(':channelId', id.toString());
  const response = await fetcher<Channel>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchChannelMessages = async ({ id }: Channel) => {
  const apiPath = API_PATH.channelMessages.replace(':channelId', id.toString());
  const response = await fetcher<{ messages: ReceiveMessage[] }>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};
