import { API_PATH } from '@/apis/api-path';
import { channels } from '@/mocks/mock-data/channel.mock';
import { baseURL } from '@/utils/baseUrl';
import { http, HttpResponse } from 'msw';

export const chatHandlers = [
  //   http.get<{ channelId: string }>(baseURL(API_PATH.channel), ({ params }) => {
  //     const channel = channels.find((ch) => ch.channelId === +params.id);
  //     return HttpResponse.json({ channel });
  //   }),
  http.get<{ channelId: string }>(
    baseURL(API_PATH.channelMessages),
    ({ params, request }) => {
      const url = new URL(request.url);
      let limit = Number(url.searchParams.get('limit'));
      let currentPage = Number(url.searchParams.get('currentPage'));
      if (!limit || !currentPage) {
        return HttpResponse.json(
          { error: 'limit, currentPage required' },
          { status: 400 }
        );
      }
      const channel = channels.find((ch) => ch.channelId === +params.channelId);
      const messages = channel?.messages.slice(
        (currentPage - 1) * limit,
        (currentPage - 1) * limit + limit
      );
      messages?.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
      );
      return HttpResponse.json({
        messages,
      });
    }
  ),
];
