import Title from '@/components/atoms/Title';
import SearchMessage from '@/components/organisms/chat/SearchMessage';
import { useChannel } from '@/hooks/chat/useChannel';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

interface ChatHeaderInfoProps {
  currentChannelId: Channel['channelId'];
}

const ChatHeaderInfo = ({ currentChannelId }: ChatHeaderInfoProps) => {
  const { setState, channels } = useChatStore(
    useShallow((state) => ({
      setState: state.setState,
      channels: state.channels,
    }))
  );
  const { channel } = useChannel(currentChannelId);

  useEffect(() => {
    setState({
      channels: {
        ...channels,
        [channel.channelId]: channel,
      },
    });
  }, [channel]);

  return (
    <div className='flex justify-between flex-1 h-[76px] items-center'>
      <div className='flex flex-col h-full justify-center w-full'>
        <Title
          size='md'
          fontWeight='bold'
          lineClamp={1}
          className='text-ellipsis w-[90%]'
        >
          {channel.title}
        </Title>
        <div className='text-caption1 text-[#838383]'>
          {channel.users.length}명의 맴버가 있습니다.
        </div>
      </div>
      <div className='flex-shrink-0'>
        <SearchMessage currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default ChatHeaderInfo;
