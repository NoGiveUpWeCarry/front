import Title from '@/components/atoms/Title';

const ChatHeaderWelcome = () => {
  return (
    <div className='flex flex-col h-[76px] justify-center'>
      <Title size='md' fontWeight='bold' lineClamp={1}>
        환영합니다! 🎉
      </Title>
      <div className='text-caption1 text-[#838383]'>채팅방을 선택해주세요</div>
    </div>
  );
};

export default ChatHeaderWelcome;
