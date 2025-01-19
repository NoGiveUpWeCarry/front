import SearchInput from '@/components/molecules/chat/SearchInput';
import ChannelList from '@/components/organisms/chat/ChannelList';
import { ChatState, useChatStore } from '@/store/chatStore';
import { FormEvent, useState } from 'react';

const ChatSidebar = () => {
  const [keyword, setKeyword] = useState('');
  const [filteredChannels, setFilteredChannels] =
    useState<ChatState['channels']>();
  const channels = useChatStore((state) => state.channels);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filteredChannels = filterChannels(keyword, channels);
    setFilteredChannels(filteredChannels);
  };

  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <form onSubmit={handleSubmit}>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button>검색</button>
      </form>
      <ChannelList channels={filteredChannels ? filteredChannels : channels} />
    </div>
  );
};

function filterChannels(keyword: string, channels: ChatState['channels']) {
  return Object.fromEntries(
    Object.entries(channels).filter(([_, channel]) => {
      const includedTitle = channel.title.includes(keyword);
      const includedUser = channel.users.some((user) =>
        user.nickname.includes(keyword)
      );
      return includedTitle || includedUser;
    })
  );
}

export default ChatSidebar;
