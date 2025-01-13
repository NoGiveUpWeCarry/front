import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import useAuthStore from '@/store/authStore';
import { ReceiveMessage } from '@/types/message.type';
import clsx from 'clsx';

interface ChatMessagesProps {
  messages: ReceiveMessage[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const userInfo = useAuthStore.getState().userInfo;
  if (!userInfo) return;
  const myUserId = userInfo.user_id;
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
      {messages?.length > 0 &&
        messages.map((message, i) => {
          const isMyMessage = message.user.user_id === myUserId;
          const sameBefore =
            i > 0 && message.user.user_id === messages[i - 1].user.user_id;
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
