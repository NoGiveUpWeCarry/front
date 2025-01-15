import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/20/solid'; // Heroicons 아이콘 사용
import { useEffect, PropsWithChildren } from 'react';

interface ModalProps {
  width?: string;
  height?: string;
  onClose: () => void;
  className?: string;
}

const ModalRoot = ({
  width = '818px',
  height = '500px',
  onClose,
  children,
  className = '',
}: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className='w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 z-50 flex justify-center items-center cursor-pointer'
      onClick={onClose}
    >
      <div
        className='relative bg-background flex flex-col gap-[20px] px-[30px] rounded-[10px] cursor-default z-50'
        onClick={(e) => e.stopPropagation()}
        style={{ width, height }}
      >
        <button
          className='absolute top-[-30px] right-[-5px] text-gray-400 hover:text-gray-600 text-white'
          onClick={onClose}
          aria-label='Close'
        >
          <XMarkIcon width={24} height={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalRoot;
