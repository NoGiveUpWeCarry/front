import ChatRoom from '@/components/organisms/chat/ChatRoom';

const ChatTemplate = () => {
  return (
    <div className='w-full md:h-screen h-[calc(100vh-50px)] flex justify-center'>
      <div className='flex w-full lg:max-w-[870px] md:max-w-[600px] max-w-[500px] relative'>
        <div className='flex w-full flex-col relative'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
