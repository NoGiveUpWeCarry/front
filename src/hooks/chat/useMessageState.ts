import { useSearchMessages } from '@/hooks/chat/useSearchMessages';
import { useInfiniteMessages } from '@/hooks/chat/useInfiniteMessages';
import { useMemoizedMessage } from '@/hooks/chat/useMemoizedMessage';
import { Channel } from '@/types/channel.type';
import { useEffect } from 'react';

interface UseMessageStateProps {
  currentChannelId: Channel['channelId'];
  searchKeyword: string;
  searchDirection: 'forward' | 'backward';
  searchMode: boolean;
  searchCursor: number | null;
}

export const useMessageState = ({
  currentChannelId,
  searchKeyword,
  searchDirection,
  searchMode,
  searchCursor,
}: UseMessageStateProps) => {
  const queryKey = {
    channelId: currentChannelId!,
    keyword: searchKeyword,
    direction: searchDirection,
    cursor: searchCursor,
  };

  const {
    data: searchData,
    isFetching: isFetchingSearchMessages,
    error,
  } = useSearchMessages(queryKey);

  const searchMessages = searchData?.messages;
  const searchMessageId = searchData?.cursor;

  const {
    data: chatData,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteMessages({
    channelId: currentChannelId,
  });

  const chatMessages = chatData?.pages.flatMap((page) => page.messages) ?? [];
  const { messages } = useMemoizedMessage({
    chatMessages,
    searchMessages,
    searchMode,
    searchCursor,
    error,
  });

  useEffect(() => {
    if (error) {
      window.alert(error.message);
    }
  }, [error]);

  return {
    messages,
    searchMessageId,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isFetchingSearchMessages,
  };
};
