import ChatRoom from '@/components/organisms/chat/ChatRoom';

const ChatTemplate = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='flex w-full lg:max-w-[870px] lg:pb-0 md:max-w-[600px] max-w-[500px] pb-[50px] relative'>
        <div className='flex w-full flex-col relative'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
