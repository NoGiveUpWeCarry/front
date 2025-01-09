import Title from '@/components/atoms/Title';

const WelcomeMessage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Title size='xs' fontWeight='medium'>
        🤝 매칭 완료
      </Title>
      <div className='text-caption1 text-gray flex flex-col items-center'>
        <div>팀원들과 함께 만들어갈 멋진 프로젝트가 기대됩니다.</div>
        <div>이제 새로운 공간에서 협업을 시작해보세요!</div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
