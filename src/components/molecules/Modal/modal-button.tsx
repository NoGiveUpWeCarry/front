import { XMarkIcon } from '@heroicons/react/20/solid';

export interface ModalButtonProps {
  onClose: () => void;
}

const ModalButton = ({ onClose }: ModalButtonProps) => {
  return (
    <div className='text-white h-10 flex items-center justify-end'>
      <button onClick={onClose} className='hover:text-gray-300'>
        <XMarkIcon width={24} />
      </button>
    </div>
  );
};

export default ModalButton;
