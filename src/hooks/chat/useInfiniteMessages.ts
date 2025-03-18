import { fetchChannelMessages } from '@/apis/channel.api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryKey {
  channelId: number;
}

export const useInfiniteMessages = (queryKey: QueryKey) => {
  return useInfiniteQuery({
    queryKey: ['messages', queryKey],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        ...queryKey,
        direction: pageParam.direction,
        cursor: pageParam.cursor,
      }),
    initialPageParam: {
      cursor: null as number | null,
      direction: 'backward' as 'forward' | 'backward',
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursor
        ? {
            cursor: lastPage.cursor,
            direction: 'backward' as 'forward' | 'backward',
          }
        : null;
    },
    staleTime: Infinity,
  });
};
