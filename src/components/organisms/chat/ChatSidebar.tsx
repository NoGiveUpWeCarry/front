import SearchInput from '@/components/molecules/chat/SearchInput';
import ChannelList from '@/components/organisms/chat/ChannelList';
import { useChatStore } from '@/store/chatStore';

const ChatSidebar = () => {
  const channels = useChatStore((state) => state.channels);
  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <SearchInput />
      <ChannelList channels={channels} />
    </div>
  );
};

export default ChatSidebar;
