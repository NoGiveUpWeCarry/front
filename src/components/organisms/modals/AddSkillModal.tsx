import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useAddSkills, useDeleteSkills } from '@/hooks/queries/mypage/settings';
import { useSettingsStore } from '@/store/settingsStore';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { KeyboardEvent, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const AddSkillModal = ({ onClose }: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const [selectedSkills, setSelectedSkills] = useState(settingsForm?.skills);
  const [removedSkills, setRemovedSkills] = useState<string[]>([]);

  const { mutate: addSkills } = useAddSkills();
  const { mutate: deleteSkills } = useDeleteSkills();

  const successHandler = () => querySuccessHandler('settings-info');

  const handleSaveSkills = () => {
    addSkills(
      {
        skillData: selectedSkills,
      },
      {
        onSuccess: successHandler,
      }
    );

    if (removedSkills.length > 0) {
      deleteSkills(
        {
          skillData: removedSkills,
        },
        {
          onSuccess: successHandler,
        }
      );
    }

    setSettingsForm({ ...settingsForm, skills: selectedSkills });
    onClose();
  };

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      setSelectedSkills([...selectedSkills, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((el) => el !== skill));
    if (settingsForm.skills.includes(skill)) {
      setRemovedSkills([...removedSkills, skill]);
    }
  };

  return (
    <Modal onClose={onClose} className='!px-8 w-[540px]'>
      <Modal.Title>기술 스택 선택하기</Modal.Title>
      <div className='text-[13px] text-[#7D7D7D] flex flex-col'>
        <span>
          당신이 다루어 본 기술과 현재 배우고 있는 기술을 작성해주세요.
        </span>
        <span>어떤 기술을 선호하는지 보여줄 기회입니다!</span>
        <div className='flex mt-5'>
          <Input
            className='w-[250px]'
            bgColor='light'
            placeholder='기술 스택을 입력해주세요'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkill}
          />
        </div>
        <div className='flex flex-wrap gap-2 mt-3 min-h-20'>
          {selectedSkills.map((skill) => (
            <button
              key={skill}
              className='flex items-center justify-between px-[10px] py-[5px] h-fit rounded-[10px] border border-[#838383] w-fit text-center text-[12px]'
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill} <XMarkIcon width={16} />
            </button>
          ))}
        </div>
        <div className='flex justify-center items-center my-2'>
          <Button
            variants='filled'
            width='92px'
            height='29px'
            radius='lg'
            className='bg-[#FF7E5F]'
            onClick={handleSaveSkills}
          >
            저장
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSkillModal;
