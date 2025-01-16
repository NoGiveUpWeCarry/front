import Title from '@/components/atoms/Title';
import { useChannel } from '@/hooks/useChannel';
import { ChatState } from '@/store/chatStore';

interface ChatHeaderInfoProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const ChatHeaderInfo = ({ currentChannelId }: ChatHeaderInfoProps) => {
  const { channel, isFetching } = useChannel(currentChannelId);

  if (isFetching) {
    return <div>채널 정보 불러오는 중...</div>;
  }

  return (
    <>
      <Title size='md' fontWeight='bold' lineClamp={1}>
        {channel?.title}
      </Title>
      <div className='text-caption1 text-[#838383]'>
        {channel?.users.length}명의 맴버가 있습니다.
      </div>
    </>
  );
};

export default ChatHeaderInfo;
