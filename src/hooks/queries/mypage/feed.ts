import { getFeed } from '@/apis/mypage';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetFeeds = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ['get-feeds', userId],
    queryFn: ({ pageParam = 1 }) =>
      getFeed({ userId, page: pageParam, limit: 5 }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
