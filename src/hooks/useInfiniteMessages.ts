import { fetchChannelMessages } from '@/apis/channel.api';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const useInfiniteMessages = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const setMessages = useChatStore((state) => state.setMessages);

  const { direction, setState, cursors, mode } = useSearchStore(
    useShallow((state) => ({
      direction: state.direction,
      setState: state.setState,
      cursors: state.cursors,
      mode: state.mode,
    }))
  );

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    isLoading,
    isFetching,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['messages', currentChannelId],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        channelId: currentChannelId,
        limit: 30,
        cursor: pageParam,
        direction: direction,
      }),
    initialPageParam: cursors.prev,
    getNextPageParam: (lastPage) => {
      return mode === 'search' ? cursors.next : lastPage.cursors.next;
    }, // 최신 데이터 조회
    getPreviousPageParam: (firstPage) => {
      return mode === 'search' ? cursors.prev : firstPage.cursors.prev;
    }, // 이전 데이터 조회
  });

  useEffect(() => {
    if (data && !isFetching) {
      const messages = data.pages.flatMap((page) => page.messages);
      setMessages(messages, currentChannelId);
    }
  }, [data]);

  useEffect(() => {
    if (!data || isFetching) return;
    switch (direction) {
      case 'forward':
        if (!hasNextPage) return;
        fetchNextPage();
        break;
      case 'backward':
        if (!hasPreviousPage) return;
        fetchPreviousPage();
        break;
    }
  }, [direction]);

  return {
    fetchNextPage,
    fetchPreviousPage,
    isLoading,
    isFetching,
    setState,
    cursors,
    data,
    hasNextPage,
    hasPreviousPage,
    direction,
    mode,
  };
};
