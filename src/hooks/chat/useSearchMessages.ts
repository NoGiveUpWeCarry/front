import { searchChannelMessages } from '@/apis/channel.api';
import { useSearchStore } from '@/store/searchStore';
import { useQuery } from '@tanstack/react-query';

interface QueryKey {
  channelId: number;
  cursor: number | null;
  limit: number;
  direction: 'backward' | 'forward';
  keyword: string;
}

export const useSearchMessages = (queryKey: QueryKey) => {
  const searchMode = useSearchStore((state) => state.searchMode);

  return useQuery({
    queryKey: ['searchMessages', queryKey],
    queryFn: () => searchChannelMessages(queryKey),
    enabled: !!searchMode,
  });
};
