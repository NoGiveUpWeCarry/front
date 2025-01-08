import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
// import useAuthStore from '@/store/authStore';
import { Message as IMessage } from '@/types/chat.type';
import clsx from 'clsx';

interface ChatMessagesProps {
  messages: IMessage[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  // const userInfo = useAuthStore((state) => state.userInfo);
  const userInfo = {
    id: 'me',
  };
  if (!userInfo) return null;

  return (
    <div
      className={clsx(
        'grow pl-[56px] pr-[44px] flex flex-col gap-[24px] scrollbar overflow-hidden hover:overflow-auto mr-[12px] hover:mr-0'
      )}
    >
      <WelcomeMessage />
      <Date className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </Date>
      {messages.map((message, i) => {
        return (
          <Message
            key={message.sender.id}
            message={message}
            sameBefore={
              i > 1 && message.sender.id === messages[i - 1].sender.id
            }
            isMyMessage={message.sender.id === userInfo.id}
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
