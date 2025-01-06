import ChatSidebar from '@/components/organisms/ChatSidebar';

const ChatPage = () => {
  return (
    <div className='w-full h-full flex justify-center'>
      <div className='flex max-w-[1240px]'>
        <div>
          <ChatSidebar />
        </div>
        <div>right</div>
      </div>
    </div>
  );
};

export default ChatPage;
