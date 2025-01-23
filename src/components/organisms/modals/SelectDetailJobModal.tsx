import Button from '@/components/atoms/Button';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { ROLE_LIST } from '@/constants/roles';
import {
  successHandler,
  useUpdateDetailJob,
} from '@/hooks/queries/mypage/settings';
import { useSettingsStore } from '@/store/settingsStore';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const KOR_ROLE = {
  Programmer: '개발자',
  Artist: '아티스트',
  Designer: '디자이너',
};

const SelectDetailJobModal = ({ onClose }: ModalProps) => {
  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const [selectedItem, setSelectedItem] = useState({
    category: settingsForm?.jobDetail?.split(' / ')[0],
    detail: settingsForm?.jobDetail?.split(' / ')[1],
  });

  const { mutate } = useUpdateDetailJob();

  const handleSave = () => {
    mutate(
      {
        detailJobData: {
          category: selectedItem.category,
          jobDetail: selectedItem.detail,
        },
      },
      {
        onSuccess: () => {
          successHandler();
          // setSettingsForm({
          //   ...settingsForm,
          //   jobDetail: newJob,
          // });
          onClose();
        },
      }
    );
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Title>상세 직무 선택</Modal.Title>
      <div className='mt-5'>
        {Object.keys(ROLE_LIST).map((key, i) => (
          <div className='my-3' key={key}>
            <div className='flex flex-wrap gap-2'>
              {ROLE_LIST[key as keyof typeof ROLE_LIST].map((role: string) => (
                <button
                  key={role}
                  className={`px-2 py-1 w-fit border ${selectedItem.detail === role ? 'border-white bg-online' : 'border-[#D9D9D9]'} rounded-md`}
                  onClick={() =>
                    setSelectedItem({
                      category: KOR_ROLE[key as keyof typeof KOR_ROLE],
                      detail: role,
                    })
                  }
                >
                  {role}
                </button>
              ))}
            </div>
            {i < 2 && <HorizontalDivider className='my-4' />}
          </div>
        ))}
      </div>
      <div className='my-[30px] flex justify-center items-center'>
        <Button
          variants='filled'
          width='92px'
          height='29px'
          radius='lg'
          className='bg-[#FF7E5F]'
          onClick={handleSave}
        >
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default SelectDetailJobModal;
