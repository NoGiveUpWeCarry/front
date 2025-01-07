import LoginButton from '@/components/atoms/LoginButton';
import RoleSelectLogo from '@/components/molecules/RoleSelectLogo';
import { useState } from 'react';

const RolePage = () => {
  const [logo, setLogo] = useState('');
  return (
    <div className='flex justify-center w-full min-h-svh'>
      <div className='w-[700px] min-h-full flex flex-col items-center gap-[20%] pt-[10%]'>
        <RoleSelectLogo />
        <div className='flex'>
          <p>Programmer, </p> <p>Artist, </p>
          <p>Designer </p> 중 하나를 선택해주세요.
        </div>
        <LoginButton label='홈으로 이동하기' />
        <div>* 선택된 카테고리는 추후 변경할 수 있습니다.</div>
      </div>
    </div>
  );
};

export default RolePage;
