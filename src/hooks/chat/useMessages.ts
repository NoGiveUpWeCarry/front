import { fetchChannelMessages } from '@/apis/channel.api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryKey {
  channelId: number;
  cursors: {
    prev: number | null;
    next: number | null;
  };
  limit: number;
}

export const useInfiniteMessages = (queryKey: QueryKey) => {
  return useInfiniteQuery({
    queryKey: ['messages', queryKey],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        ...queryKey,
        direction: pageParam.direction,
        cursor: pageParam.cursors,
      }),
    initialPageParam: {
      cursors: queryKey.cursors,
      direction: 'backward' as 'forward' | 'backward',
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursors.next
        ? {
            cursors: {
              next: getNextCursor(lastPage.cursors.next, queryKey.cursors.next),
              prev: lastPage.cursors.prev,
            },
            direction: 'backward' as 'forward' | 'backward',
          }
        : null;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.cursors.prev
        ? {
            cursors: {
              next: firstPage.cursors.next,
              prev: getPrevCursor(
                firstPage.cursors.prev,
                queryKey.cursors.prev
              ),
            },
            direction: 'forward' as 'forward' | 'backward',
          }
        : null;
    },
    gcTime: 0,
  });
};

function getPrevCursor(prev1: number | null, prev2: number | null) {
  if (!prev1 && !prev2) return null;
  if (!prev1) return prev2;
  if (!prev2) return prev1;
  return prev1 > prev2 ? prev1 : prev2;
}

function getNextCursor(next1: number | null, next2: number | null) {
  if (!next1 && !next2) return null;
  if (!next1) return next2;
  if (!next2) return next1;
  return next1 < next2 ? next1 : next2;
}
