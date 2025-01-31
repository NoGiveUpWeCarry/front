import Introduce from '@/components/molecules/mypage/Introduce';
import Job from '@/components/molecules/mypage/Job';
import ProfileAvatar from '@/components/molecules/mypage/ProfileAvatar';
import StatusDropdown from '@/components/molecules/mypage/StatusDropdown';
import UsernameInput from '@/components/molecules/mypage/UsernameInput';
import LinkBox from '@/components/organisms/LinkBox';
import AddSkillModal from '@/components/organisms/modals/AddSkillModal';
import SelectDetailJobModal from '@/components/organisms/modals/SelectDetailJobModal';
import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { useDeleteSkills } from '@/hooks/queries/mypage/settings';
import { useModal } from '@/hooks/useModal';
import { useSettingsStore } from '@/store/settingsStore';
import { SettingsResponse } from '@/types/mypage.type';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const InfoSection = ({ settingsInfo }: { settingsInfo: SettingsResponse }) => {
  const {
    isOpen: isJobOpen,
    openModal: openJobModal,
    closeModal: closeJobModal,
  } = useModal();
  const {
    isOpen: isSkillOpen,
    openModal: openSkillModal,
    closeModal: closeSkillModal,
  } = useModal();

  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const { mutate: deleteSkills } = useDeleteSkills();

  useEffect(() => {
    setSettingsForm({
      ...settingsInfo,
    });
  }, [settingsInfo]);

  const handleClickSkill = (skill: string) => {
    deleteSkills(
      { skillData: [skill] },
      {
        onSuccess: () => querySuccessHandler('settings-info'),
      }
    );
  };

  return (
    <>
      {isSkillOpen && <AddSkillModal onClose={closeSkillModal} />}
      {isJobOpen && <SelectDetailJobModal onClose={closeJobModal} />}
      <SettingsSection>
        <SettingsSection.Title>기본 정보</SettingsSection.Title>
        <SettingsSection.Description>
          나를 소개해 보세요.
        </SettingsSection.Description>
        <SettingsSection.Content gap={20}>
          {/* 프로필 사진 */}
          <ProfileAvatar />
          <div className='flex flex-col gap-[20px]'>
            {/* 유저 네임 */}
            <UsernameInput />
            {/* 한 줄 소개 */}
            <Introduce />
            <div className='flex flex-col'>
              {/* 상태 */}
              <StatusDropdown />
              {/* 상세 직무 */}
              <Job openJobModal={openJobModal} />
            </div>
            {/* 기술 스택 */}
            <SettingsSection.InputWithLabel label='스킬' className='relative'>
              <div className='w-full border border-[#838383] rounded-[10px] bg-transparent outline-none flex flex-wrap items-center gap-2 pl-[15px] pr-[30px] h-10'>
                {settingsForm?.skills?.length > 0 ? (
                  settingsForm?.skills?.map((skill) => (
                    <button
                      key={skill}
                      className='flex items-center justify-between px-[10px] py-[3px] h-fit rounded-[5px] border border-[#838383] w-fit text-center text-[12px] hover:text-[#838383]'
                      onClick={() => handleClickSkill(skill)}
                    >
                      <span>{skill}</span>
                      <div>
                        <XMarkIcon width={12} />
                      </div>
                    </button>
                  ))
                ) : (
                  <span className='text-[#838383] text-[14px]'>
                    오른쪽 추가 버튼을 눌러 기술 스택을 추가해주세요
                  </span>
                )}
              </div>
              <button
                className='absolute right-[10px] bg-[#f5f5f5]]'
                onClick={openSkillModal}
              >
                <PlusIcon width={24} />
              </button>
            </SettingsSection.InputWithLabel>
            {/* 링크 */}
            <div className='flex flex-col gap-2'>
              <label className='text-[15px] font-medium'>링크</label>
              <LinkBox links={settingsForm.links} />
            </div>
          </div>
        </SettingsSection.Content>
      </SettingsSection>
    </>
  );
};

export default InfoSection;
