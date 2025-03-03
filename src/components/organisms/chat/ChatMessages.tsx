import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import LoadingDots from '@/components/molecules/LoadingDots';
import Messages from '@/components/organisms/chat/Messages';
import { LIMIT } from '@/constants/limit';
import { useInfiniteMessages } from '@/hooks/chat/useMessages';
import { useSearchMessages } from '@/hooks/chat/useSearchMessages';
import { useScroll } from '@/hooks/useScroll';
import { useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/shallow';

interface ChatMessagesProps {
  currentChannelId: Channel['channelId'];
}

let renderingCount = 1;

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const {
    setSearchState,
    searchMode,
    searchDirection,
    searchCursor,
    searchKeyword,
  } = useSearchStore(
    useShallow((state) => ({
      setSearchState: state.setState,
      searchMode: state.searchMode,
      searchDirection: state.searchDirection,
      searchCursor: state.searchCursor,
      searchKeyword: state.searchKeyword,
    }))
  );

  const { socketMessages, updateNeeded, setChatState } = useChatStore(
    useShallow((state) => ({
      socketMessages: state.messages[currentChannelId],
      updateNeeded: state.updateNeeded,
      setChatState: state.setState,
    }))
  );

  const { data: searchData, isFetching: isFetchingSearchMessages } =
    useSearchMessages({
      channelId: currentChannelId,
      cursor: searchCursor,
      direction: searchDirection,
      keyword: searchKeyword,
      limit: LIMIT.SEARCH_MESSAGES,
    });

  const [direction, setDirection] = useState<'backward' | 'forward'>(
    'backward'
  );

  const cursors = useMemo(() => {
    if (!searchData) return { prev: null, next: null };
    if (searchData.message.code === 404) return { prev: null, next: null };
    return { prev: searchData.cursors.prev, next: searchData.cursors.next };
  }, [searchData]);

  const {
    data: chatData,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteMessages({
    channelId: currentChannelId,
    cursors: cursors,
    limit: LIMIT.INFINITE_MESSAGES,
  });

  // console.log('chatMessages', renderingCount++);

  const { ref: loadNextRef, inView: isTopInView } = useInView({
    threshold: 1,
  });

  const { ref: loadPrevRef, inView: isBottomInView } = useInView({
    threshold: 1,
  });

  const messages = useMemo(() => {
    let messages: ReceiveMessage[];
    const chatMessages = chatData?.pages.flatMap((page) => page.messages);
    const searchMessages = searchData?.messages;

    messages = deduplicateAndSortMessages([
      ...(searchMessages ? searchMessages : []),
      ...(chatMessages ? chatMessages : []),
      ...(socketMessages ? socketMessages : []),
    ]);

    return messages;
  }, [searchData, chatData, socketMessages]);

  const totalImages = messages.filter((message) => message.type === 'image');

  const { handleImageLoaded, scrollContainerRef } = useScroll<ReceiveMessage>({
    datas: messages,
    totalImageCount: totalImages.length,
    searchMode,
    direction,
  });

  useEffect(() => {
    // 다른 사람이 채널에 입장했을 때 해당 채널의 readCount 가 1씩 증가하는데 이를 화면에 반영하기 위함
    if (updateNeeded) {
      refetch();
      setChatState({ updateNeeded: false });
    }
  }, [updateNeeded]);

  useEffect(() => {
    if (isTopInView) {
      fetchNextPage();
      setDirection('backward');
      setSearchState({ searchMode: false });
    }
  }, [isTopInView]);

  useEffect(() => {
    if (isBottomInView) {
      fetchPreviousPage();
      setDirection('forward');
      setSearchState({ searchMode: false });
    }
  }, [isBottomInView]);

  if (isLoading) {
    return (
      <div className='flex justify-center grow'>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      {messages.length > 0 && (
        <>
          {hasNextPage && !isFetchingNextPage && !isFetchingSearchMessages && (
            <div ref={loadNextRef} />
          )}
          {isFetching && <LoadingDots />}
          <Messages messages={messages} handleImageLoad={handleImageLoaded} />

          {hasPreviousPage &&
            !isFetchingPreviousPage &&
            !isFetchingSearchMessages && <div ref={loadPrevRef} />}
        </>
      )}
      {!messages.length && !isFetching && !isFetchingSearchMessages && (
        <WelcomeMessage />
      )}
    </div>
  );
};

function deduplicateAndSortMessages(
  messages: ReceiveMessage[]
): ReceiveMessage[] {
  // 1. messageId 기준으로 정렬
  const sortedMessages = messages.toSorted((a, b) => a.messageId - b.messageId);

  // 2. 중복 제거 (messageId가 동일한 경우 첫 번째 메시지만 유지)
  const uniqueMessages = sortedMessages.filter((message, index, arr) => {
    return index === 0 || message.messageId !== arr[index - 1].messageId;
  });

  return uniqueMessages;
}

export default ChatMessages;
