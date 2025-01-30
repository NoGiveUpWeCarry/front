import Title from '@/components/atoms/Title';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';

interface ChatHeaderInfoProps {
  currentChannelId: Channel['channelId'];
}

const ChatHeaderInfo = ({ currentChannelId }: ChatHeaderInfoProps) => {
  const channels = useChatStore((state) => state.channels);
  return (
    <>
      <Title size='md' fontWeight='bold' lineClamp={1}>
        {channels[currentChannelId]?.title}
      </Title>
      <div className='text-caption1 text-[#838383]'>
        {channels[currentChannelId]?.users.length}명의 맴버가 있습니다.
      </div>
    </>
  );
};

export default ChatHeaderInfo;
