import ReactDOM from 'react-dom';
import { useEffect, PropsWithChildren } from 'react';
import Icon from '@/components/atoms/Icon';

interface ModalProps {
  onClose: () => void;
  className?: string;
}

const ModalRoot = ({
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
    <div className='w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 z-50 flex justify-center items-center cursor-pointer'>
      <div
        className={`relative w-[800px] bg-white flex flex-col px-[30px] py-[20px] rounded-[10px] cursor-default z-50 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='flex justify-end text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          <Icon
            type={'xmark'}
            color={'black'}
            className='w-[24px] h-[24px]'
          ></Icon>
        </button>
        <div className='flex flex-col px-[10px]'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default ModalRoot;
