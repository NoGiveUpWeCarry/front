import SearchMessage from '@/components/organisms/chat/SearchMessage';
import { Channel } from '@/types/channel.type';
import { PropsWithChildren } from 'react';

interface ChatHeaderProps extends PropsWithChildren {
  currentChannelId: Channel['channelId'] | null;
}

const ChatHeader = ({ currentChannelId, children }: ChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>{children}</div>
      {currentChannelId && (
        <SearchMessage currentChannelId={currentChannelId} />
      )}
    </div>
  );
};

export default ChatHeader;
