import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessagesQuery } from '@/hooks/chat/useMessages';
import { useSearchMessagesQuery } from '@/hooks/chat/useSearchMessages';
import { useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/shallow';

interface ChatMessagesProsp {
  currentChannelId: Channel['channelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProsp) => {
  const { searchMode, setState, searchKeyword } = useSearchStore(
    useShallow((state) => ({
      searchMode: state.searchMode,
      setState: state.setState,
      searchKeyword: state.searchKeyword,
    }))
  );

  const { data: searchData } = useSearchMessagesQuery(
    currentChannelId,
    searchKeyword
  );

  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isLoading,
    refetch,
  } = useInfiniteMessagesQuery(currentChannelId);

  const socketMessages = useChatStore(
    (state) => state.messages[currentChannelId!]
  );

  const { ref: loadNextRef, inView: isBottomInView } = useInView({
    threshold: 1,
  });
  const { ref: loadPrevRef, inView: isTopInView } = useInView({
    threshold: 1,
  });

  const messages = useMemo(() => {
    const searchMessages = searchData ? searchData.messages : [];
    const infiniteMessages = data
      ? data.pages?.flatMap((page) => page.messages)
      : [];
    const messages = [
      ...(searchMessages ? searchMessages : []),
      ...(searchMode ? [] : infiniteMessages),
      ...(socketMessages ? socketMessages : []),
    ];

    return deduplicateAndSortMessages(messages);
  }, [searchData, data, socketMessages, searchMode]);

  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer || searchMode) return;

    const newHeight = scrollContainer.scrollHeight;
    scrollContainer.scrollTop =
      scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    previousHeightRef.current = scrollContainer.scrollHeight;
  }, [messages, searchMode]);

  useEffect(() => {
    if (isBottomInView && hasNextPage) {
      if (searchMode) {
        setState({ searchDirection: 'forward', searchMode: false });
        refetch();
      } else {
        fetchNextPage();
      }
    }
  }, [isBottomInView, hasNextPage]);

  useEffect(() => {
    if (isTopInView && hasPreviousPage) {
      if (searchMode) {
        setState({ searchDirection: 'backward', searchMode: false });
        refetch();
      } else {
        fetchPreviousPage();
      }
    }
  }, [isTopInView, hasPreviousPage]);

  if (isLoading) {
    return (
      <div className='flex justify-center grow'>
        <div>메시지 불러오는중...</div>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      // onScroll={() => setState({ searchMode: false })}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      {messages && (
        <>
          <div ref={loadPrevRef}></div>
          <Messages messages={messages} />
          <div ref={loadNextRef}></div>
        </>
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
