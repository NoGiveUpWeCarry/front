import Title from '@/components/atoms/Title';
import SearchMessage from '@/components/organisms/chat/SearchMessage';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';

interface ChatHeaderInfoProps {
  currentChannelId: Channel['channelId'];
}

const ChatHeaderInfo = ({ currentChannelId }: ChatHeaderInfoProps) => {
  const channels = useChatStore((state) => state.channels);
  return (
    <div className='flex justify-between flex-1 h-[76px] items-center'>
      <div className='flex flex-col h-full justify-center'>
        <Title size='md' fontWeight='bold' lineClamp={1}>
          {channels[currentChannelId]?.title}
        </Title>
        <div className='text-caption1 text-[#838383]'>
          {channels[currentChannelId]?.users.length}명의 맴버가 있습니다.
        </div>
      </div>
      <SearchMessage currentChannelId={currentChannelId} />
    </div>
  );
};

export default ChatHeaderInfo;
