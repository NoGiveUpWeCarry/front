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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer'>
      <div
        className={`relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white flex flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 rounded-lg cursor-default z-50 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          <Icon type={'xmark'} color={'black'} className='w-6 h-6' />
        </button>
        <div className='flex flex-col w-full max-h-[90vh] overflow-y-auto rounded-lg'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalRoot;
