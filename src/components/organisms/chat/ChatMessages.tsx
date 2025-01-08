import Avatar from '@/components/atoms/Avatar';
import Date from '@/components/atoms/Date';
import MessageBubble from '@/components/atoms/MessageBubble';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import { Message as IMessage } from '@/types/chat.type';

interface ChatMessagesProps {
  messages: IMessage[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className='grow px-[56px] flex flex-col gap-[20px]'>
      <WelcomeMessage />
      <Date className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </Date>
      {messages.map((message, i) => (
        <>
          {i > 0 && message.sender === messages[i - 1].sender ? (
            <MessageBubble content={message.content} />
          ) : (
            <div>
              <Avatar />
              <div>{message.sender}</div>
              <div>role</div>
              <MessageBubble content={message.content} />
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default ChatMessages;

/*
1. 한 명이 연속으로 메세지를 여러개 보낸 경우 프로필 이미지는 하나만
2. 날짜는 '일' 기준으로 하나씩만

*/
