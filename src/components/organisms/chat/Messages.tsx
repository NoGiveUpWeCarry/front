import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import { useMessagesInfinite } from '@/hooks/useMessages';
import useAuthStore from '@/store/authStore';
import { ChatState } from '@/store/chatStore';
import { formatDateMessages } from '@/utils/format';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';

interface MessagesProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const Messages = ({ currentChannelId }: MessagesProps) => {
  const { messages, hasNextPage, isFetching, fetchNextPage, currentPage } =
    useMessagesInfinite(currentChannelId);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const previousHeightRef = useRef<number>(0);
  const dateMessages = formatDateMessages(messages);
  const user = useAuthStore.getState().userInfo!;
  const myUserId = user.userId;

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    if (currentPage === 1) {
      // 스크롤이 가장 아래로 내려가도록 설정
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    } else {
      // 패칭된 메시지 아이템 개수에 비례하여 내려가도록 설정 (scrollTop = 현재 전체 스크롤 높이 - 이전 전체 스크롤 높이)
      const newHeight = scrollContainer.scrollHeight;
      scrollContainer.scrollTop =
        scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    }

    previousHeightRef.current = scrollContainer.scrollHeight;

    const handleScroll = () => {
      if (scrollContainer.scrollTop === 0) {
        loadMore();
      }
    };
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [messages]);

  if (isFetching) {
    return <div>메시지 불러오는중...</div>;
  }

  return (
    <div
      ref={scrollContainerRef}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      {messages?.length ? (
        Object.entries(dateMessages).map(([date, messages], i) => {
          return (
            <Fragment key={i}>
              <Date className='text-gray text-caption2 text-center mt-[20px]'>
                {date}
              </Date>
              {messages.map((message, i) => {
                const isMyMessage = message.user.userId === myUserId;
                const sameBefore =
                  i > 0 && message.user.userId === messages[i - 1].user.userId;
                return (
                  <Message
                    key={message.messageId}
                    message={message}
                    sameBefore={sameBefore}
                    isMyMessage={isMyMessage}
                    className={sameBefore ? 'mt-[10px]' : 'mt-[24px]'}
                  />
                );
              })}
            </Fragment>
          );
        })
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
};

export default Messages;
