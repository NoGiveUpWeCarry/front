import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, PropsWithChildren, ReactNode } from 'react';

interface IProps {
  width?: string;
  height?: string;
  hasCloseButton?: boolean;
  onClose: () => void;
  className?: string;
}

const Modal = ({
  width = '818px',
  height = '500px',
  hasCloseButton = true,
  onClose,
  children,
  className,
}: PropsWithChildren<IProps>) => {
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
        className='absolute top-50% left-50% -translate-x-50% -translate-y-50% cursor-default !z-50'
        onClick={(e) => e.stopPropagation()}
      >
        {hasCloseButton && <Modal.CloseButton onClose={onClose} />}
        <Modal.InnerModal className={className} width={width} height={height}>
          {children}
        </Modal.InnerModal>
      </div>
    </div>,
    document.body
  );
};

Modal.CloseButton = function ({ onClose }: { onClose: () => void }) {
  return (
    <div className='text-white h-10 flex items-center justify-end'>
      <button onClick={onClose}>
        <XMarkIcon width={24} />
      </button>
    </div>
  );
};

Modal.InnerModal = function ({
  children,
  className,
  width,
  height,
}: PropsWithChildren<{ className?: string; width: string; height: string }>) {
  return (
    <div
      className={`w-full h-full bg-white rounded-[20px] px-[50px] py-[30px] ${className}`}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};

Modal.Title = function ({ children }: { children: ReactNode }) {
  return <h1 className='text-[22px] font-medium mb-3'>{children}</h1>;
};

export default Modal;
