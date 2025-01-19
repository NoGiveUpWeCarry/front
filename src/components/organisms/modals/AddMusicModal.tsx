import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useAddMusicWork } from '@/hooks/queries/mypage/introduce';
import { useMyPageStore } from '@/store/mypageStore';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const AddMusicModal = ({
  isOpen,
  onClose,
}: ModalProps & { isOpen: boolean }) => {
  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));
  const { mutate: addMusic } = useAddMusicWork(ownerId);

  const [newUrl, setNewUrl] = useState('');

  const handleAddMusic = () => {
    addMusic({ musicUrl: newUrl });
    setNewUrl('');
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} width='444px' height='101px' className='!p-[30px]'>
      <div className='flex gap-[10px]'>
        <Input
          placeholder='음악 URL을 입력해주세요.'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button
          width='100px'
          height='40px'
          variants='outline'
          radius='md'
          className='border border-[#838383]'
          onClick={handleAddMusic}
        >
          추가
        </Button>
      </div>
    </Modal>
  );
};

export default AddMusicModal;
