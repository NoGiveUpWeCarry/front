import {
  SearchConnectionHubResponse,
  SearchModalResponse,
  SearchPostResponse,
} from '@/types/search.type';
import fetcher from '@/utils/fetcher';

export const searchByModal = async ({
  category,
  keyword,
}: {
  category: 'all' | 'feed' | 'connectionhub';
  keyword: string;
}) => {
  const response = await fetcher<SearchModalResponse>({
    url: '/search/modal',
    method: 'GET',
    params: {
      category,
      keyword,
    },
  });
  return response.data;
};

export const searchConnectionHub = async ({
  pageParam = 0,
  keyword,
}: {
  pageParam: number;
  keyword: string;
}) => {
  const response = await fetcher<SearchConnectionHubResponse>({
    url: '/search/connectionhub',
    method: 'GET',
    params: {
      cursor: pageParam,
      keyword,
    },
  });
  return response.data;
};

export const searchFeed = async ({
  pageParam = 0,
  keyword,
}: {
  pageParam: number;
  keyword: string;
}) => {
  const response = await fetcher<SearchPostResponse>({
    url: '/search/feed',
    method: 'GET',
    params: {
      cursor: pageParam,
      keyword,
    },
  });
  return response.data;
};
