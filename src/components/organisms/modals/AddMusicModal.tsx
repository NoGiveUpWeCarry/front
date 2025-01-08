import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { useState } from 'react';

const AddMusicModal = ({ onClose }: { onClose: () => void }) => {
  const [url, setUrl] = useState('');

  const handleAddMusic = () => {
    // 로직
  };

  return (
    <Modal onClose={onClose} width='444px' height='134px' className='!p-5'>
      <h1 className='text-[22px] font-medium mb-3'>음악 작업 추가</h1>
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
