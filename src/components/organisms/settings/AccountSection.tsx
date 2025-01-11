import Button from '@/components/atoms/Button';
import Label from '@/components/atoms/Label';
import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { useState } from 'react';

const AccountSection = () => {
  const [username, setUsername] = useState('');

  const handleRemoveAccount = () => {
    // 로직
    alert('삭제되었습니다.');
    window.location.href = '/';
  };

  return (
    <SettingsSection>
      <SettingsSection.Title>계정 설정</SettingsSection.Title>
      <SettingsSection.Description>
        계정 정보를 확인하고 수정할 수 있어요.
      </SettingsSection.Description>
      <SettingsSection.Content gap={20}>
        <div>
          <div className='flex gap-[100px] items-center'>
            <Label text='연결된 이메일' />
            <span className='text-[#838383] font-light'>pad@gmail.com</span>
          </div>
          <span className='text-[10px] text-[#7D7D7D] mt-[-10px]'>
            이메일은 변경할 수 없어요.
          </span>
        </div>
        <SettingsSection.InputWithLabel
          label='유저 네임'
          button={{
            text: '변경',
            color: 'normal',
          }}
          value={username}
          onSetValue={setUsername}
        />
        <span className='text-[10px] text-[#7D7D7D] mt-[-10px]'>
          유저네임을 변경하면 프로필 페이지 링크도 변경됩니다.
        </span>
        <SettingsSection.Divider />
        <div className='flex flex-col mt-[-20px] mb-5 relative'>
          <span className='text-[20px]'>계정 삭제하기</span>
          <span className='text-[15px] text-[#7D7D7D]'>
            계정을 삭제하시면 그동안 패드에 올려주신 글과 정보가 모두 삭제되어
            복구할 수 없습니다.
          </span>
          <Button
            radius='md'
            width='66px'
            height='40px'
            className='bg-red-500 text-white absolute right-0 top-1/2 transform -translate-y-1/2'
            onClick={handleRemoveAccount}
          >
            삭제
          </Button>
        </div>
      </SettingsSection.Content>
    </SettingsSection>
  );
};

export default AccountSection;
