import Icon from '@/components/atoms/Icon';

const HubInfo = () => {
  return (
    <div className='flex'>
      <div>
        <Icon type='calendar' color={'gray'} className='w-[24px] h-[24px]' />{' '}
        시작 예정일
      </div>
    </div>
  );
};

export default HubInfo;
