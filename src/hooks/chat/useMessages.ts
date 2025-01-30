import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteMessagesQuery = (currentChannelId: number) => {
  return useInfiniteQuery({
    queryKey: ['messages', currentChannelId],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        channelId: currentChannelId,
        direction: useSearchStore.getState().searchDirection, // backward | forward
        limit: LIMIT.INFINITE_MESSAGES,
        cursor: pageParam,
      }),
    initialPageParam: null as number | null, // next | prev | null
    getNextPageParam: (lastPage) => lastPage.cursors.next,
    getPreviousPageParam: (firstPage) => firstPage.cursors.prev,
  });
};
