import Title from '@/components/atoms/Title';
import SearchInput from '@/components/molecules/chat/SearchInput';

const ChatRoomHeader = () => {
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC]'>
      <div className='flex flex-col h-full'>
        <Title size='md' fontWeight='bold'>
          Project Chat
        </Title>
        <div className='text-caption1 text-[#838383]'>
          n명의 맴버가 있습니다.
        </div>
      </div>
      <div>
        <SearchInput />
      </div>
    </div>
  );
};

export default ChatRoomHeader;
