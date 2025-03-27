import { fetchChannel } from '@/apis/channel.api';
import { ChatState } from '@/store/chatStore';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useChannel = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ['channel', currentChannelId],
    queryFn: () => fetchChannel(currentChannelId),
  });

  return { channel: data?.channel, isFetching };
};
