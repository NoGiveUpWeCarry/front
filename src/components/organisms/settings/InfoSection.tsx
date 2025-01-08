import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Label from '@/components/atoms/Label';
import Dropdown from '@/components/molecules/Dropdown';
import LinkBox from '@/components/organisms/LinkBox';
import AddSkillModal from '@/components/organisms/modals/AddSkillModal';
import SelectDetailJobModal from '@/components/organisms/modals/SelectDetailJobModal';
import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { useDropdown } from '@/hooks/useDropdown';
import { useModal } from '@/hooks/useModal';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useRef, useState } from 'react';

const options = ['👀  일 찾는 중', '🙇  구인 중', '💤  쉬는 중', '💻  작업 중'];

interface SettingsFormData {
  imageUrl: File | null;
  selfIntroduction: string;
  detailedJob: {
    category: string;
    jobName: string;
  };
  skills: string[];
  links: string[];
  pushNoti: boolean;
  feedNoti: boolean;
  projectNoti: boolean;
  username: string;
}

const InfoSection = () => {
  const imageRef = useRef<HTMLInputElement>(null);

  const {
    openDropdown,
    onClickOption,
    selectedOption,
    toggleDropdown,
    onKeyDown,
    focusedIndex,
    setFocusedIndex,
  } = useDropdown({ data: options, initialValue: options[0] });
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

  const [inputs, setInputs] = useState<SettingsFormData>({
    imageUrl: null,
    selfIntroduction: '',
    detailedJob: {
      category: '',
      jobName: '',
    },
    skills: [],
    links: [],
    pushNoti: false,
    feedNoti: false,
    projectNoti: false,
    username: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInputs({ ...inputs, imageUrl: file });
  };

  const handleDeleteImage = () => {
    setInputs({ ...inputs, imageUrl: null });
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  return (
    <>
      {isSkillOpen && (
        <AddSkillModal
          onClose={closeSkillModal}
          initialSkills={inputs.skills}
          setSkills={(skills) => setInputs({ ...inputs, skills })}
        />
      )}
      {isJobOpen && (
        <SelectDetailJobModal
          onClose={closeJobModal}
          job={inputs.detailedJob}
          setJob={(value) => setInputs({ ...inputs, detailedJob: value })}
        />
      )}
      <SettingsSection>
        <SettingsSection.Title>기본 정보</SettingsSection.Title>
        <SettingsSection.Description>
          나를 소개해 보세요.
        </SettingsSection.Description>
        <SettingsSection.Content gap={20}>
          <div className='flex gap-[22px] py-[10px]'>
            <Avatar
              src={
                inputs.imageUrl
                  ? URL.createObjectURL(inputs.imageUrl!)
                  : undefined
              }
              size='md'
              className='bg-[#EDEDED]'
            />
            <input type='file' ref={imageRef} hidden onChange={handleChange} />
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
                <Button
                  width='66px'
                  height='100%'
                  radius='sm'
                  className='border border-[#2E2E2E] py-1 !text-[#2E2E2E]'
                  onClick={handleDeleteImage}
                >
                  사진 삭제
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[20px]'>
            <SettingsSection.InputWithLabel
              label='한 줄 소개'
              value={inputs.selfIntroduction}
              onSetValue={(value) =>
                setInputs({ ...inputs, selfIntroduction: value })
              }
            />
            <div className='flex flex-col'>
              <div className='relative' onKeyDown={onKeyDown}>
                <Label text='상태' />
                <button
                  className='mt-2 border border-[#838383] rounded-[10px] h-10 w-44 bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px]'
                  onClick={toggleDropdown}
                >
                  <span className='text-[15px]'>{selectedOption}</span>
                  <ChevronDownIcon width={20} color='#838383' />
                </button>
                {openDropdown && (
                  <Dropdown
                    options={options}
                    focusedIndex={focusedIndex!}
                    setFocusedIndex={setFocusedIndex}
                    onClickDropdownItem={onClickOption}
                  />
                )}
              </div>
              <div className='relative w-full mt-5'>
                <Label text='상세 직무' />
                <button
                  className='border border-[#838383] rounded-[10px] h-10 bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px] w-[280px] mt-2'
                  onClick={openJobModal}
                >
                  {inputs.detailedJob.category ? (
                    <span className='text-[15px]'>
                      {inputs.detailedJob.category} /{' '}
                      {inputs.detailedJob.jobName}
                    </span>
                  ) : (
                    <span className='text-[15px] text-[#838383]'>
                      상세 직무를 선택해주세요
                    </span>
                  )}
                </button>
              </div>
            </div>
            <SettingsSection.InputWithLabel label='스킬' className='relative'>
              <div className='w-full border border-[#838383] rounded-[10px] bg-transparent outline-none flex flex-wrap items-center gap-3 pl-[15px] pr-[30px] h-10'>
                {inputs.skills.map((skill) => (
                  <button
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        skills: inputs.skills.filter((el) => el !== skill),
                      })
                    }
                    className='hover:text-[#838383]'
                  >
                    <span key={skill}>{skill}</span>
                  </button>
                ))}
              </div>
              <button
                className='absolute right-[10px] bg-[#f5f5f5]]'
                onClick={openSkillModal}
              >
                <PlusIcon width={24} />
              </button>
            </SettingsSection.InputWithLabel>
            <div className='flex flex-col gap-2'>
              <label className='text-[15px] font-medium'>링크</label>
              <LinkBox
                links={inputs.links}
                setLinks={(value) => setInputs({ ...inputs, links: value })}
              />
            </div>
          </div>
        </SettingsSection.Content>
      </SettingsSection>
    </>
  );
};

export default InfoSection;
