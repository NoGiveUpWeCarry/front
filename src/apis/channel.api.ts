import { API_PATH } from '@/apis/api-path';
import { Channel } from '@/types/channel.type';
import {
  FetchChannelMessagesRequest,
  FetchChannelMessagesResponse,
  SearchChannelMessagesRequest,
  SearchChannelMessagesResponse,
} from '@/types/message.type';
import fetcher from '@/utils/fetcher';

export const fetchChannel = async (channelId: Channel['channelId']) => {
  const apiPath = API_PATH.channel.replace(':channelId', channelId.toString());
  const response = await fetcher<{ channel: Channel }>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchChannelMessages = async ({
  channelId,
  cursor,
  limit,
  direction,
}: FetchChannelMessagesRequest) => {
  const apiPath = API_PATH.channelMessages.replace(
    ':channelId',
    channelId.toString()
  );
  const response = await fetcher<FetchChannelMessagesResponse>({
    url: apiPath,
    method: 'GET',
    params: {
      cursor,
      limit,
      direction,
    },
  });
  return response.data;
};

export const searchChannelMessages = async ({
  channelId,
  cursor,
  limit,
  keyword,
  direction,
}: SearchChannelMessagesRequest) => {
  const apiPath = API_PATH.searchMessages.replace(
    ':channelId',
    channelId.toString()
  );
  const response = await fetcher<SearchChannelMessagesResponse>({
    url: apiPath,
    method: 'GET',
    params: {
      cursor,
      limit,
      direction,
      keyword,
    },
  });
  return response.data;
};
