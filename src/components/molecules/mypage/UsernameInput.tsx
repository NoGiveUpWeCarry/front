import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { useUpdateNickname } from '@/hooks/queries/mypage/settings';
import { useSettingsStore } from '@/store/settingsStore';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const UsernameInput = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const { mutate } = useUpdateNickname();

  const handleButtonClick = () => {
    if (isEditing) {
      mutate(
        {
          nickname: settingsForm?.nickname,
        },
        {
          onSuccess: () => {
            querySuccessHandler('settings-info');
            setIsEditing(false);
          },
        }
      );
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <SettingsSection.InputWithLabel
        label='유저 네임'
        button={{
          text: isEditing ? '저장' : '변경',
          color: 'normal',
          onClick: handleButtonClick,
        }}
        readOnly={!isEditing}
        value={settingsForm?.nickname ?? ''}
        onSetValue={(value) =>
          setSettingsForm({ ...settingsForm, nickname: value })
        }
        placeholder='유저 네임을 입력해주세요'
      />
      <span className='text-[10px] text-[#7D7D7D] mt-[-12px]'>
        유저네임을 변경하면 프로필 페이지 링크도 변경됩니다.
      </span>
      <span className='text-[10px] text-[#7D7D7D] mt-[-16px]'>
        &apos;변경&apos; 버튼을 눌러서 닉네임을 바꿔보세요.
      </span>
    </>
  );
};

export default UsernameInput;
