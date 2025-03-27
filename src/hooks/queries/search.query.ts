import { searchByModal, searchConnectionHub, searchFeed } from '@/apis/search';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useSearchByModal = (
  category: 'all' | 'feed' | 'connectionhub',
  keyword: string
) => {
  return useQuery({
    queryKey: ['search-modal', keyword, category],
    queryFn: () => searchByModal({ category, keyword }),
    enabled: !!keyword,
  });
};

export const useSearchConnectionHub = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['saerch-hub', keyword],
    queryFn: ({ pageParam = 0 }) => searchConnectionHub({ keyword, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return String(pagination.lastCursor) === '0'
        ? undefined
        : pagination.lastCursor;
    },
    initialPageParam: 0,
  });
};

export const useSearchFeed = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['search-feed', keyword],
    queryFn: ({ pageParam = 0 }) => searchFeed({ keyword, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return String(pagination.lastCursor) === '0'
        ? undefined
        : pagination.lastCursor;
    },
    initialPageParam: 0,
  });
};
