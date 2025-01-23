import ChannelList from '@/components/organisms/chat/ChannelList';
import SearchChannel from '@/components/organisms/chat/SearchChannel';
import useDebounce from '@/hooks/useDebounce';
import { useChatStore } from '@/store/chatStore';
import { filterChannels } from '@/utils/filter';
import { useState } from 'react';

const ChatSidebar = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const channels = useChatStore((state) => state.channels);
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
