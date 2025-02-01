import LoadingDots from '@/components/molecules/LoadingDots';
import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessagesQuery } from '@/hooks/chat/useMessages';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ChatMessagesProps {
  currentChannelId: Channel['channelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const {
    data,
    hasPreviousPage,
    fetchPreviousPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteMessagesQuery(currentChannelId);

  const socketMessages = useChatStore(
    (state) => state.messages[currentChannelId!]
  );

  const { ref: loadPrevRef, inView: isTopInView } = useInView({
    threshold: 1,
  });

  const messages = useMemo(() => {
    const infiniteMessages = data
      ? data.pages?.flatMap((page) => page.messages)
      : [];
    const messages = [
      ...(infiniteMessages ? infiniteMessages : []),
      ...(socketMessages ? socketMessages : []),
    ];

    return deduplicateAndSortMessages(messages);
  }, [data, socketMessages]);

  const totalImages = messages.filter((message) => message.type === 'image');

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    refetch();
  }, [currentChannelId]);

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const newHeight = scrollContainer.scrollHeight;
    scrollContainer.scrollTop =
      scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    previousHeightRef.current = scrollContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isTopInView && hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [isTopInView, hasPreviousPage]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (imagesLoaded === totalImages.length && scrollContainer) {
      const newHeight = scrollContainer.scrollHeight;
      scrollContainer.scrollTop =
        scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
      previousHeightRef.current = scrollContainer.scrollHeight;
    }
  }, [imagesLoaded, totalImages]);

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
      // onScroll={() => setState({ searchMode: false })}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      {messages && (
        <>
          {hasPreviousPage && <div ref={loadPrevRef}></div>}
          {isFetching && <LoadingDots />}
          <Messages messages={messages} handleImageLoad={handleImageLoad} />
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
