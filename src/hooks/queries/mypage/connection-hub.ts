import { getConnectionHub } from '@/apis/mypage';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetConnectionHubs = (
  userId: number,
  type: 'applied' | 'created'
) => {
  return useInfiniteQuery({
    queryKey: ['get-connection-hubs', userId],
    queryFn: ({ pageParam = 1 }) =>
      getConnectionHub({ userId, type, page: pageParam, limit: 6 }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
