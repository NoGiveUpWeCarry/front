import ChatHeaderInfo from '@/components/molecules/chat/ChatHeaderInfo';
import ChatHeaderWelcome from '@/components/molecules/chat/ChatHeaderWelcome';
import { Channel } from '@/types/channel.type';
import { Suspense } from 'react';
interface ChatHeaderProps {
  currentChannelId: Channel['channelId'] | null;
}

const ChatHeader = ({ currentChannelId }: ChatHeaderProps) => {
  if (!currentChannelId) return <ChatHeaderWelcome />;
  return (
    <div className='flex justify-between items-center border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px] px-[20px] py-[10px]'>
      <div className='flex h-full items-center flex-grow-1 flex-shrink-0 flex-auto'>
        <Suspense fallback={<ChatHeaderWelcome />}>
          <ChatHeaderInfo currentChannelId={currentChannelId} />
        </Suspense>
      </div>
    </div>
  );
};

export default ChatHeader;
