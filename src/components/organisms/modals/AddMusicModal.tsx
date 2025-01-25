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
  const [nickname] = useMyPageStore(useShallow((state) => [state.nickname]));
  const { mutate: addMusic } = useAddMusicWork(nickname);

  const [newUrl, setNewUrl] = useState('');

  const handleAddMusic = () => {
    if (!/^http/.test(newUrl)) {
      alert('올바른 URL을 작성해주세요.');
      setNewUrl('');
      return;
    }

    addMusic({ musicUrl: newUrl });
    onClose();
    setNewUrl('');
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className='!p-[30px]'>
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
