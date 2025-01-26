import { searchByModal, searchConnectionHub, searchFeed } from '@/apis/search';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useSearchByModal = (
  category: 'all' | 'feed' | 'connectionhub',
  keyword: string
) => {
  return useQuery({
    queryKey: ['search-modal', keyword],
    queryFn: () => searchByModal({ category, keyword }),
    enabled: !!keyword,
  });
};

export const useSearchConnectionHub = (
  keyword: string,
  latest?: boolean,
  cursor?: number
) => {
  return useInfiniteQuery({
    queryKey: ['get-search-page', keyword],
    queryFn: ({ pageParam = cursor }) =>
      searchConnectionHub({ keyword, latest, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.lastCursor !== null ? pagination.lastCursor : undefined;
    },
    initialPageParam: cursor || 1,
  });
};

export const useSearchFeed = (
  keyword: string,
  latest?: boolean,
  cursor?: number
) => {
  return useInfiniteQuery({
    queryKey: ['get-search-page', keyword],
    queryFn: ({ pageParam = cursor }) =>
      searchFeed({ keyword, latest, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.lastCursor !== null ? pagination.lastCursor : undefined;
    },
    initialPageParam: cursor || 1,
  });
};
