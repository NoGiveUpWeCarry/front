import { API_PATH } from '@/apis/api-path';
import { channels } from '@/mocks/mock-data/channel.mock';
import { Channel } from '@/types/channel.type';
import { baseURL } from '@/utils/baseUrl';
import { http, HttpResponse } from 'msw';

export const chatHandlers = [
  http.get<Pick<Channel, 'channelId'>>(
    baseURL(API_PATH.channel),
    ({ params }) => {
      const channel = channels.find((ch) => ch.channelId === params.channelId);
      return HttpResponse.json({ channel });
    }
  ),
  http.get<Pick<Channel, 'channelId'>>(
    baseURL(API_PATH.channelMessages),
    ({ params }) => {
      const channel = channels.find((ch) => ch.channelId === params.channelId);
      const messages = channel?.messages;
      return HttpResponse.json({ messages });
    }
  ),
];
