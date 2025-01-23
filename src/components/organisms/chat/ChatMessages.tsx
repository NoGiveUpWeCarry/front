import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessages } from '@/hooks/useInfiniteMessages';
import { ChatState, useChatStore } from '@/store/chatStore';
import { SearchState } from '@/store/searchStore';
import { UIEvent, useEffect, useRef } from 'react';

interface ChatMessagesProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const {
    isLoading,
    setState,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    direction: lastDirection,
    mode,
  } = useInfiniteMessages(currentChannelId);

  const messages = useChatStore((state) => state.messages[currentChannelId]);
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = (direction: SearchState['direction']) => {
    if (isFetching) return;
    if (direction === lastDirection) {
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
    } else {
      setState({ direction });
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (mode === 'search') return;
    const scrollContainer = e.currentTarget;
    const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
    const top = 0;
    const bottom = scrollTop + clientHeight;
    if (scrollTop === top) {
      loadMore('backward');
    } else if (scrollHeight === bottom) {
      loadMore('forward');
    }
  };

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (
      !scrollContainer ||
      isFetching ||
      messages.length === 0 ||
      mode === 'search'
    ) {
      return;
    }

    const newHeight = scrollContainer.scrollHeight;
    scrollContainer.scrollTop =
      scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    previousHeightRef.current = scrollContainer.scrollHeight;
  }, [messages]);

  if (isLoading) {
    return <div>메시지 불러오는중...</div>;
  }

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      // onWheel={() => setState({ mode: 'scroll' })}
      // onMouseDown={() => setState({ mode: 'scroll' })}
      // onMouseUp={() => setState({ mode: 'search' })}
      // onTouchStart={() => setState({ mode: 'scroll' })}
      // onTouchEnd={() => setState({ mode: 'search' })}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      <Messages messages={messages} />
    </div>
  );
};

export default ChatMessages;
