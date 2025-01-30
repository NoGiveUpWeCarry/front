import { API_PATH } from '@/apis/api-path';
import { channels } from '@/mocks/mock-data/channel.mock';
import { SearchState } from '@/store/searchStore';
import {
  ReceiveMessage,
  SearchChannelMessagesResponse,
} from '@/types/message.type';
import { baseURL } from '@/utils/baseUrl';
import { http, HttpResponse } from 'msw';

export const chatHandlers = [
  http.get<{ id: string }>(baseURL(API_PATH.channel), ({ params }) => {
    const channel = channels.find((ch) => ch.channelId === +params.id);
    return HttpResponse.json({ channel });
  }),
  http.get<{ id: string }>(
    baseURL(API_PATH.searchMessages),
    ({ params, request }) => {
      const url = new URL(request.url);
      const limit = Number(url.searchParams.get('limit'));
      const cursor = url.searchParams.get('cursor')
        ? (Number(
            url.searchParams.get('cursor')
          ) as SearchChannelMessagesResponse['cursors']['search'])
        : null;
      const keyword = url.searchParams.get('keyword')
        ? (url.searchParams.get('keyword') as SearchState['searchKeyword'])
        : '';
      const direction = url.searchParams.get(
        'direction'
      ) as SearchState['searchDirection'];

      // 유효한 채널인지 확인
      const channel = channels.find((ch) => ch.channelId === +params.id);

      if (!channel) {
        return HttpResponse.json(
          {
            message: {
              text: '일치하는 채널이 없습니다.',
              code: 404,
            },
          },
          { status: 404 }
        );
      }

      const searchResult = searchMessage(
        cursor,
        channel.messages,
        direction,
        keyword,
        limit
      );

      // 키워드를 포함하는 메시지가 없을 경우
      if (searchResult === -1) {
        return HttpResponse.json(
          {
            message: {
              text: '메시지를 찾을 수 없습니다.',
              code: 404,
            },
          },
          { status: 404 }
        );
      }

      const { messages, next, prev, search } = searchResult;

      return HttpResponse.json({
        messages: messages.sort((a, b) => a.messageId - b.messageId),
        cursors: {
          next,
          prev,
          search,
        },
        message: {
          text: 'OK',
          code: 200,
        },
      });
    }
  ),
  http.get<{ id: string }>(
    baseURL(API_PATH.channelMessages),
    ({ params, request }) => {
      const url = new URL(request.url);
      const limit = Number(url.searchParams.get('limit'));
      const cursor = url.searchParams.get('cursor')
        ? Number(url.searchParams.get('cursor'))
        : null;
      const direction = url.searchParams.get(
        'direction'
      ) as SearchState['searchDirection'];

      if (Number.isNaN(limit)) {
        return HttpResponse.json(
          {
            message: {
              text: 'limit, required',
              code: 400,
            },
          },
          { status: 400 }
        );
      }

      // 유효한 채널인지 확인
      const channel = channels.find((ch) => ch.channelId === +params.id);

      if (!channel) {
        return HttpResponse.json(
          {
            message: {
              text: '일치하는 채널이 없습니다.',
              code: 404,
            },
          },
          { status: 404 }
        );
      }

      // 초기 데이터 패칭 시
      if (cursor === null) {
        /*
        1. 해당 채널의 messages 를 messageId 기준으로 내림차순으로 정렬
        2. next = 첫 번째 messageId,
        3. prev = next + limit 번째 messageId
        4. search = 첫 번째 messageId
        5. messages = next ~ prev - 1 번째 메시지
        */
        let messages = channel.messages.toSorted(
          (a, b) => b.messageId - a.messageId
        );

        messages = messages.slice(0, limit);

        let prev: SearchChannelMessagesResponse['cursors']['prev'] | null;
        let next: SearchChannelMessagesResponse['cursors']['next'] | null;
        let search: SearchChannelMessagesResponse['cursors']['search'] | null;
        if (messages.length) {
          next = null;
          prev = messages[messages.length - 1].messageId;
          search = messages[0].messageId;
        } else {
          next = prev = search = null;
        }

        console.log({
          messages,
          cursors: {
            prev,
            next,
            search,
          },
        });
        return HttpResponse.json({
          messages,
          cursors: {
            prev,
            next,
            search,
          },
          message: {
            text: 'OK',
            code: 200,
          },
        });
      }

      const infiniteScrollResult = infiniteScroll(
        cursor,
        channel.messages,
        direction,
        limit
      );

      if (infiniteScrollResult === -1) {
        return HttpResponse.json(
          {
            message: {
              text: '유효한 cursor 값이 아닙니다.',
              code: 400,
            },
          },
          { status: 400 }
        );
      }

      const { prev, messages, next } = infiniteScrollResult;

      return HttpResponse.json({
        messages: messages.sort((a, b) => a.messageId - b.messageId),
        cursors: {
          next: next,
          prev: prev,
        },
        message: {
          text: 'OK',
          code: 200,
        },
      });
    }
  ),
];

function findMessageIndex(
  messageId: ReceiveMessage['messageId'] | null,
  messages: ReceiveMessage[]
) {
  return messages.findIndex((message) => message.messageId === messageId);
}

function infiniteScroll(
  cursor: number,
  messages: ReceiveMessage[],
  direction: SearchState['searchDirection'],
  limit: number
) {
  if (direction === 'forward') {
    // 오름차순 정렬
    const sortedMessages = messages.toSorted(
      (a, b) => a.messageId - b.messageId
    );
    const start = findMessageIndex(cursor, sortedMessages);
    if (start === -1) return -1;
    const forwarMessages = messages.slice(start + 1, start + limit + 1);
    const isFirst = start + limit >= messages.length - 1;
    console.log({ forwarMessages });
    return {
      next: isFirst ? null : forwarMessages.at(-1)!.messageId,
      messages: forwarMessages,
      // prev: cursor,
    };
  } else if (direction === 'backward') {
    // 내림차순 정렬
    const sortedMessages = messages.toSorted(
      (a, b) => b.messageId - a.messageId
    );
    const start = findMessageIndex(cursor, sortedMessages);
    if (start === -1) return -1;
    const backwardMessages = sortedMessages.slice(start + 1, start + limit + 1);
    const isLast = start + limit >= messages.length - 1;
    console.log({ backwardMessages });
    return {
      // next: cursor,
      messages: backwardMessages,
      prev: isLast ? null : backwardMessages.at(-1)!.messageId,
    };
  }
  return -1;
}

function searchMessage(
  cursor: SearchChannelMessagesResponse['cursors']['next' | 'prev' | 'search'],
  messages: ReceiveMessage[],
  direction: SearchState['searchDirection'],
  keyword: SearchState['searchKeyword'],
  limit: number
) {
  let start: number;
  let sortedMessages: ReceiveMessage[];

  if (direction === 'forward') {
    // 오름차순 정렬
    sortedMessages = messages.toSorted((a, b) => a.messageId - b.messageId);
    start = findMessageIndex(cursor, sortedMessages);
    for (let i = start + 1; i < sortedMessages.length; i++) {
      if (sortedMessages[i].content.includes(keyword)) {
        const prevIdx = i - limit < 0 ? 0 : i - limit;
        const nextIdx =
          i + limit >= sortedMessages.length
            ? sortedMessages.length - 1
            : i + limit;
        const searchIdx = i;
        const isLast = prevIdx === 0;
        const isFirst = nextIdx === sortedMessages.length - 1;
        return {
          prev: isLast ? null : sortedMessages[prevIdx].messageId,
          search: sortedMessages[searchIdx].messageId,
          next: isFirst ? null : sortedMessages[nextIdx].messageId,
          messages: sortedMessages.slice(prevIdx, nextIdx),
        };
      }
    }
  } else if (direction === 'backward') {
    // 내림차순 정렬
    sortedMessages = messages.toSorted((a, b) => b.messageId - a.messageId);
    start = findMessageIndex(cursor, sortedMessages);
    for (let i = start + 1; i < sortedMessages.length; i++) {
      if (sortedMessages[i].content.includes(keyword)) {
        const prevIdx =
          i + limit >= sortedMessages.length
            ? sortedMessages.length - 1
            : i + limit;
        const nextIdx = i - limit < 0 ? 0 : i - limit;
        const searchIdx = i;
        const isLast = prevIdx === sortedMessages.length - 1;
        const isFirst = nextIdx === 0;
        return {
          prev: isLast ? null : sortedMessages[prevIdx].messageId,
          search: sortedMessages[searchIdx].messageId,
          next: isFirst ? null : sortedMessages[nextIdx].messageId,
          messages: sortedMessages.slice(prevIdx, nextIdx),
        };
      }
    }
  }
  return -1;
}
