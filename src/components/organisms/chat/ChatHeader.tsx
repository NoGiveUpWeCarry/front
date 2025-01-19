import Title from '@/components/atoms/Title';
import ChatHeaderInfo from '@/components/molecules/chat/ChatHeaderInfo';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { ChatState } from '@/store/chatStore';

interface ChatHeaderProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatHeader = ({ currentChannelId }: ChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>
        {currentChannelId ? (
          <ChatHeaderInfo currentChannelId={currentChannelId} />
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
