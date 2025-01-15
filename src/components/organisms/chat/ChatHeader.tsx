import Title from '@/components/atoms/Title';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { useChannel } from '@/hooks/useChannel';
import { ChatState } from '@/store/chatStore';

interface ChatHeaderProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatHeader = ({ currentChannelId }: ChatHeaderProps) => {
  const { channels } = useChannel(currentChannelId);
  console.log(channels);
  console.log('currentChannelId >>>', currentChannelId);
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>
        {currentChannelId ? (
          <>
            <Title size='md' fontWeight='bold' lineClamp={1}>
              {channels[currentChannelId].title}
            </Title>
            <div className='text-caption1 text-[#838383]'>
              {/* {channels[currentChannelId].users.length}명의 맴버가 있습니다. */}
              n명의 멤버가 있습니다.
            </div>
          </>
        ) : (
          <>
            <Title size='md' fontWeight='bold' lineClamp={1}>
              채널을 선택해주세요
            </Title>
            <div className='text-caption1 text-[#838383]'>
              선택된 채널이 없습니다
            </div>
          </>
        )}
      </div>
      <div className='shrink-0'>
        <SearchInput />
      </div>
    </div>
  );
};

export default ChatHeader;
