import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';

const ChatRoomBody = () => {
  return (
    <div className='grow'>
      <WelcomeMessage />
      <div className='text-gray text-caption2 text-center mt-[20px]'>
        2025년 1월 2일
      </div>
    </div>
  );
};

export default ChatRoomBody;
