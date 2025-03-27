import ChannelSearchForm from '@/components/molecules/chat/ChannelSearchForm';
import ChannelList from '@/components/organisms/chat/ChannelList';
import { useChannelId } from '@/hooks/chat/useChannelId';
import useDebounce from '@/hooks/useDebounce';
import { useChatStore } from '@/store/chatStore';
import { filterChannels } from '@/utils/filter';
import { useShallow } from 'zustand/shallow';

const ChannelSelectPage = () => {
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
    <div className='flex flex-col gap-[24px] flex-1 lg:pt-[61px] p-[10px] w-full lg:max-w-[870px] lg:pb-0 md:max-w-[600px] max-w-[500px] '>
      <ChannelSearchForm
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
      <ChannelList
        channels={filteredChannels ? filteredChannels : channels}
        currentChannelId={currentChannelId}
      />
    </div>
  );
};

export default ChannelSelectPage;
