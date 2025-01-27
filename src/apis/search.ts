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
  latest,
  cursor,
  keyword,
}: {
  latest?: boolean;
  cursor?: number;
  keyword: string;
}) => {
  const response = await fetcher<SearchConnectionHubResponse>({
    url: '/search/connectionhub',
    method: 'GET',
    params: {
      latest,
      cursor,
      keyword,
    },
  });
  return response.data;
};

export const searchFeed = async ({
  latest,
  cursor,
  keyword,
}: {
  latest?: boolean;
  cursor?: number;
  keyword: string;
}) => {
  const response = await fetcher<SearchPostResponse>({
    url: '/search/feed',
    method: 'GET',
    params: {
      latest,
      cursor,
      keyword,
    },
  });
  return response.data;
};
