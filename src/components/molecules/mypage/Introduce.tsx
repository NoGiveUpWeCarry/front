import SettingsSection from '@/components/organisms/settings/SettingsSection';
import {
  successHandler,
  useUpdateIntroduction,
} from '@/hooks/queries/mypage/settings';
import useDebounce from '@/hooks/useDebounce';
import { useSettingsStore } from '@/store/settingsStore';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const Introduce = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const { mutate } = useUpdateIntroduction();
  const debouncedIntroduce = useDebounce(settingsForm.introduce, 300);

  useEffect(() => {
    if (settingsForm?.introduce && isEditing) {
      mutate(
        { introduce: debouncedIntroduce },
        {
          onSuccess: () => {
            successHandler();
            alert('ok');
          },
        }
      );
    }
  }, [debouncedIntroduce]);

  return (
    <SettingsSection.InputWithLabel
      label='한 줄 소개'
      value={settingsForm.introduce}
      onSetValue={(value) =>
        setSettingsForm({ ...settingsForm, introduce: value })
      }
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
    />
  );
};

export default Introduce;
