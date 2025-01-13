import SearchInput from '@/components/molecules/chat/SearchInput';
import ChannelList from '@/components/organisms/chat/ChannelList';
import { useChannels } from '@/hooks/useChannel';

const ChatSidebar = () => {
  const { channels } = useChannels();
  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <SearchInput />
      <ChannelList channels={channels} />
    </div>
  );
};

export default ChatSidebar;
