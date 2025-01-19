import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMessagesInfinite = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const socketMessages = useChatStore((state) => state.messages);
  const channelMessages = socketMessages[currentChannelId] || [];

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['messages', currentChannelId],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        channelId: currentChannelId,
        limit: LIMIT.MESSAGES,
        currentPage: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const isLastPage = lastPage.messages.length < LIMIT.MESSAGES;
      return isLastPage ? null : lastPageParam + 1;
    },
  });

  const httpMessages = data?.pages
    .flatMap((page) => page.messages)
    .sort((a, b) => a.messageId - b.messageId);
  const currentPage = data?.pageParams[data.pageParams.length - 1];

  return {
    messages: [...(httpMessages ? httpMessages : []), ...channelMessages],
    fetchNextPage,
    hasNextPage,
    isFetching,
    currentPage,
  };
};
