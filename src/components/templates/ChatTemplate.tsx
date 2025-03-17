import ChatRoom from '@/components/organisms/chat/ChatRoom';

const ChatTemplate = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='flex h-full max-w-[1240px] gap-[50px] relative'>
        <div className='w-[870px] flex flex-col relative'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
