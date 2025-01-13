import SearchInput from '@/components/molecules/chat/SearchInput';
import ChannelList from '@/components/organisms/chat/ChannelList';

const ChatSidebar = () => {
  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <SearchInput />
      <ChannelList />
    </div>
  );
};

export default ChatSidebar;
