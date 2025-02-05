import ChatRoom from '@/components/organisms/chat/ChatRoom';
import ChatSidebar from '@/components/organisms/chat/ChatSidebar';
import { useSidebarStore } from '@/store/sidebarStore';

const ChatTemplate = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='flex h-full max-w-[1240px] gap-[50px] relative'>
        <div className='w-[320px] xl:flex xl:pt-[30px] hidden xl:mb-[100px]'>
          <ChatSidebar />
        </div>
        {isOpen && (
          <div className='w-[320px] flex my-[100px] xl:hidden absolute bg-background h-[85%]'>
            <ChatSidebar />
          </div>
        )}

        <div className='w-[870px] flex flex-col'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
