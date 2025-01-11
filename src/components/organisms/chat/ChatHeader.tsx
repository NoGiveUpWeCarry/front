import Title from '@/components/atoms/Title';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';

const ChatHeader = () => {
  const { currentChannelId, channels } = useChatStore(
    useShallow((state) => ({
      currentChannelId: state.currentChannelId,
      channels: state.channels,
    }))
  );

  const channel = channels.find((ch) => ch.id === currentChannelId);

  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>
        <Title size='md' fontWeight='bold' lineClamp={1}>
          {channel?.title}
        </Title>
        <div className='text-caption1 text-[#838383]'>
          {channel?.users.length}명의 맴버가 있습니다.
        </div>
      </div>
      <div className='shrink-0'>
        <SearchInput />
      </div>
    </div>
  );
};

export default ChatHeader;
