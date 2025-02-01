import ChannelList from '@/components/organisms/chat/ChannelList';
import SearchChannel from '@/components/organisms/chat/SearchChannel';
import useDebounce from '@/hooks/useDebounce';
import { useChatStore } from '@/store/chatStore';
import { filterChannels } from '@/utils/filter';
import { useShallow } from 'zustand/shallow';

const ChatSidebar = () => {
  const { channels, keyword, setKeyword } = useChatStore(
    useShallow((state) => ({
      channels: state.channels,
      keyword: state.channelSearchKeyword,
      setKeyword: state.setChannelSearchKeyword,
    }))
  );
  const debouncedKeyword = useDebounce(keyword, 300);
  const filteredChannels = filterChannels(debouncedKeyword, channels);

  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <SearchChannel
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ChannelList channels={filteredChannels ? filteredChannels : channels} />
    </div>
  );
};

export default ChatSidebar;
