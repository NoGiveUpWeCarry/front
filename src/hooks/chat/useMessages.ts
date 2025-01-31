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
    gcTime: 0, // queryKey 가 변경되면 이전 데이터들은 캐시에서 바로 제거
  });
};
