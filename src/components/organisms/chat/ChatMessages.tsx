import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import { useChatStore } from '@/store/chatStore';

const ChatMessages = () => {
  const messages = useChatStore((state) => state.messages);
  console.log(messages);
  return (
    <div className='grow px-[56px] flex flex-col'>
      <WelcomeMessage />
      <Date className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </Date>
      <Message />
    </div>
  );
};

export default ChatMessages;

/*
1. 한 명이 연속으로 메세지를 여러개 보낸 경우 프로필 이미지는 하나만
2. 날짜는 '일' 기준으로 하나씩만

*/
