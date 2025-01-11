import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import { user } from '@/mock/user.mock';
import { useChatStore } from '@/store/chatStore';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';

const ChatMessages = () => {
  const { messages, currentChannelId } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      currentChannelId: state.currentChannelId,
    }))
  );

  const userInfo = user;
  const currentMessages = messages[currentChannelId];
  if (!userInfo) return null;
  return (
    <div
      className={clsx(
        'grow pl-[56px] pr-[44px] flex flex-col scrollbar overflow-hidden hover:overflow-y-scroll mr-[12px] hover:mr-0'
      )}
    >
      <WelcomeMessage />
      <Date className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </Date>
      {currentMessages?.length &&
        currentMessages.map((message, i) => {
          const isMyMessage = message.user.id === userInfo.id;
          const sameBefore =
            i > 0 && message.user.id === currentMessages[i - 1].user.id;
          return (
            <Message
              key={i}
              message={message}
              sameBefore={sameBefore}
              isMyMessage={isMyMessage}
              className={sameBefore ? 'mt-[10px]' : 'mt-[24px]'}
            />
          );
        })}
    </div>
  );
};

export default ChatMessages;

/*
1. 한 명이 연속으로 메세지를 여러개 보낸 경우 프로필 이미지는 하나만
2. 날짜는 '일' 기준으로 하나씩만 (해당 채팅방에서 그 날 첫 메시지일경우 그 날의 날짜 표시)

*/
