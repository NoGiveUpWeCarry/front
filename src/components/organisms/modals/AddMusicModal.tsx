import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useState } from 'react';

const AddMusicModal = ({ onClose }: ModalProps) => {
  const [url, setUrl] = useState('');

  const handleAddMusic = () => {
    // 로직
  };

  return (
    <Modal onClose={onClose} width='444px' height='134px' className='!p-5'>
      <Modal.Title>음악 작업 추가</Modal.Title>
      <div className='flex gap-[10px]'>
        <Input
          placeholder='url을 입력해주세요.'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          width='99px'
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
