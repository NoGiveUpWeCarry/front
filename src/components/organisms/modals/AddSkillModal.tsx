import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { KeyboardEvent, useState } from 'react';

interface AddSkillModalProps extends ModalProps {
  setSkills: (skills: string[]) => void;
  initialSkills: string[];
}

const AddSkillModal = ({
  onClose,
  initialSkills,
  setSkills,
}: AddSkillModalProps) => {
  const [selectedSkills, setSeletedSkills] = useState<string[]>(initialSkills);
  const [inputValue, setInputValue] = useState('');

  const handleSaveSkills = () => {
    setSkills(selectedSkills);
    onClose();
  };

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      setSeletedSkills([...selectedSkills, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSeletedSkills(selectedSkills.filter((el) => el !== skill));
  };

  return (
    <Modal onClose={onClose} width='620px' height='400px'>
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
        <div className='flex flex-wrap gap-2 mt-3 '>
          {selectedSkills.map((skill) => (
            <button
              key={skill}
              className={`flex items-center justify-between px-[10px] py-[5px] rounded-[10px] border border-[#838383] w-fit text-center text-[12px]`}
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill} <XMarkIcon width={16} />
            </button>
          ))}
        </div>
        <div className='flex justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2'>
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
