import Icon from '@/components/atoms/Icon';
import Title from '@/components/atoms/Title';
import ToggleButton from '@/components/molecules/ToggleButton';
import SearchMessage from '@/components/organisms/chat/SearchMessage';
import { useChannel } from '@/hooks/chat/useChannel';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

interface ChatHeaderInfoProps {
  currentChannelId: Channel['channelId'];
}

const ChannelInfo = ({ channel }: { channel: Channel }) => {
  return (
    <div className='flex flex-col h-full justify-center w-full'>
      <Title
        size='sm'
        fontWeight='bold'
        lineClamp={1}
        className='text-ellipsis w-[90%] md:text-[25px]'
      >
        {channel.title}
      </Title>
      <div className='text-caption1 text-[#838383]'>
        {channel.users.length}명의 맴버가 있습니다.
      </div>
    </div>
  );
};

const ChatHeaderInfo = ({ currentChannelId }: ChatHeaderInfoProps) => {
  const { setState, channels } = useChatStore(
    useShallow((state) => ({
      setState: state.setState,
      channels: state.channels,
    }))
  );
  const { channel } = useChannel(currentChannelId);
  const [isSearchMode, setIsSearchMode] = useState(false);

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
      {isSearchMode ? (
        <div className='flex justify-between items-center w-full'>
          <ToggleButton
            onClick={() => setIsSearchMode(!isSearchMode)}
            className='w-[30px] h-[30px] text-darkgray'
          >
            <Icon
              type='plus'
              color='black'
              className='text-darkgray rotate-45'
            />
          </ToggleButton>
          <SearchMessage currentChannelId={currentChannelId} />
        </div>
      ) : (
        <div className='flex items-center gap-2 w-full'>
          <ChannelInfo channel={channel} />
          <ToggleButton
            onClick={() => setIsSearchMode(!isSearchMode)}
            className='w-[24px] h-[24px] text-[#CCCCCC]'
          >
            <Icon type='search' color='gray' />
          </ToggleButton>
        </div>
      )}
    </div>
  );
};

export default ChatHeaderInfo;
