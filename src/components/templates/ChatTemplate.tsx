import ChatRoomBody from '@/components/organisms/chat/ChatRoomBody';
import ChatRoomHeader from '@/components/organisms/chat/ChatRoomHeader';
import ChatRoomInput from '@/components/organisms/chat/ChatRoomInput';
import ChatSidebar from '@/components/organisms/chat/ChatSidebar';

const ChatTemplate = () => {
  return (
    <div className='w-full h-screen flex justify-center '>
      <div className='flex h-full py-[40px] max-w-[1240px] gap-[50px]'>
        <div className='w-[320px] flex'>
          <ChatSidebar />
        </div>
        <div className='w-[870px] flex flex-col'>
          <ChatRoomHeader />
          <div className='px-[56px] flex flex-col grow'>
            <ChatRoomBody />
            <ChatRoomInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
