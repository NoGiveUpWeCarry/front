import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import { useUpdateImage } from '@/hooks/queries/mypage/settings';
import { useSettingsStore } from '@/store/settingsStore';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { ChangeEvent, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

const ProfileAvatar = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { settingsForm, setSettingsForm } = useSettingsStore(
    useShallow((state) => state)
  );

  const { mutate } = useUpdateImage();

  const handleAddImage = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    mutate(
      {
        file: formData,
      },
      {
        onSuccess: () => {
          querySuccessHandler('settings-info');
          setSettingsForm({ ...settingsForm, profileUrl: file });
          alert('파일이 저장되었습니다.');
        },
      }
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAddImage(file);
    }
  };

  return (
    <div className='flex gap-[22px] py-[10px]'>
      <Avatar
        src={
          settingsForm.profileUrl instanceof File
            ? URL.createObjectURL(settingsForm.profileUrl)
            : (settingsForm.profileUrl as string)
        }
        size='md'
        className='bg-[#EDEDED] object-cover'
      />
      <input type='file' ref={imageRef} hidden onChange={handleFileChange} />
      <div className='flex flex-col'>
        <span className='text-[15px]'>프로필 사진</span>
        <span className='text-[12px] text-[#838383]'>
          10MB 이하 PNG, JPG, GIF, SVG를 올려주세요.
        </span>
        <div className='mt-4 flex gap-[10px] items-center text-white text-[10px]'>
          <Button
            width='66px'
            height='100%'
            radius='sm'
            className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] py-1'
            onClick={() => imageRef?.current?.click()}
          >
            사진 업로드
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
