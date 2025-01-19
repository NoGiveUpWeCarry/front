import { useNavigate } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';

const Behind = () => {
  const navigate = useNavigate(); // useNavigate 훅 호출

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className='flex w-full'>
      <button onClick={handleBack} className='flex items-center'>
        <Icon type='behind' color='black' className='w-[24px] h-[24px]' />
      </button>
    </div>
  );
};

export default Behind;
