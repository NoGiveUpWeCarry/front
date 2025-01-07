import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import { useChatStore } from '@/store/chatStore';

const ChatRoomBody = () => {
  const messages = useChatStore((state) => state.messages);
  console.log(messages);
  return (
    <div className='grow'>
      <WelcomeMessage />
      <Date className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </Date>
    </div>
  );
};

export default ChatRoomBody;
