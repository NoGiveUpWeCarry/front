import ChannelList from '@/components/organisms/chat/ChannelList';
import SearchChannel from '@/components/organisms/chat/SearchChannel';
import { useChannelId } from '@/hooks/chat/useChannelId';
import { useChat } from '@/hooks/chat/useChat';
import useDebounce from '@/hooks/useDebounce';
import { useChatStore } from '@/store/chatStore';
import { filterChannels } from '@/utils/filter';
import { useShallow } from 'zustand/shallow';

const ChannelSelectPage = () => {
  useChat();
  const { channels, keyword, setKeyword } = useChatStore(
    useShallow((state) => ({
      channels: state.channels,
      keyword: state.channelSearchKeyword,
      setKeyword: state.setChannelSearchKeyword,
    }))
  );
  const { currentChannelId } = useChannelId();
  const debouncedKeyword = useDebounce(keyword, 300);
  const filteredChannels = filterChannels(debouncedKeyword, channels);

  return (
    <div className='flex flex-col gap-[24px] flex-1 '>
      <SearchChannel
        value={keyword}
        className='px-[20px] mt-[30px]'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ChannelList
        channels={filteredChannels ? filteredChannels : channels}
        currentChannelId={currentChannelId}
      />
    </div>
  );
};

export default ChannelSelectPage;
