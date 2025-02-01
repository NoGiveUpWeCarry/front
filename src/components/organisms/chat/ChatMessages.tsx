import LoadingDots from '@/components/molecules/LoadingDots';
import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessagesQuery } from '@/hooks/chat/useMessages';
import { useScroll } from '@/hooks/useScroll';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

interface ChatMessagesProps {
  currentChannelId: Channel['channelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
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

  const { handleImageLoad, scrollContainerRef } = useScroll<ReceiveMessage>({
    datas: messages,
    totalImageCount: totalImages.length,
  });

  useEffect(() => {
    refetch();
  }, [currentChannelId]);

  useEffect(() => {
    if (isTopInView && hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [isTopInView, hasPreviousPage]);

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
