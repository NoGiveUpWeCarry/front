import ReactDOM from 'react-dom';
import { useEffect, PropsWithChildren } from 'react';
import Icon from '@/components/atoms/Icon';
import clsx from 'clsx';


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
      <div className='flex flex-col gap-[10px]'>

        <button
          className='flex justify-end text-gray-400 hover:text-gray-600 text-white'
          onClick={onClose}
          aria-label='Close'
        >
          <Icon
            type={'xmark'}
            color={'white'}
            className='w-[24px] h-[24px]'
          ></Icon>
        </button>
        <div
          className={`relative bg-white flex flex-col gap-[20px] px-[30px] py-[10px] rounded-[10px] cursor-default z-50 ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={{ width, height }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalRoot;
