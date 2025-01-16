import { fetchChannel } from '@/apis/channel.api';
import { ChatState } from '@/store/chatStore';
import { useQuery } from '@tanstack/react-query';

export const useChannel = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const { data, isFetching } = useQuery({
    queryKey: ['channel', currentChannelId],
    queryFn: () => fetchChannel(currentChannelId),
  });

  return { channel: data?.channel, isFetching };
};
