import Button from '@/components/atoms/Button';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { ROLE_LIST } from '@/constants/roles';
import { useState } from 'react';

interface IProps extends ModalProps {
  setJob: (value: { category: string; jobName: string }) => void;
  job: {
    category: string;
    jobName: string;
  };
}

const SelectDetailJobModal = ({ onClose, job, setJob }: IProps) => {
  const [selectedItem, setSelectedItem] = useState(job);

  return (
    <Modal onClose={onClose} height='460px'>
      <div className='flex flex-wrap gap-2'>
        {ROLE_LIST.map((role, index) => (
          <button
            key={role}
            className={`px-2 py-1 w-fit border ${selectedItem.jobName === role ? 'border-white bg-online' : 'border-[#D9D9D9]'} rounded-md`}
            onClick={() =>
              setSelectedItem({
                category:
                  index > 33 ? '아티스트' : index > 20 ? '디자인' : 'IT',
                jobName: role,
              })
            }
          >
            {role}
          </button>
        ))}
      </div>
      <div className='my-[30px] flex justify-center items-center'>
        <Button
          variants='filled'
          width='92px'
          height='29px'
          radius='lg'
          className='bg-[#FF7E5F]'
          onClick={() => {
            setJob(selectedItem);
            onClose();
          }}
        >
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default SelectDetailJobModal;
