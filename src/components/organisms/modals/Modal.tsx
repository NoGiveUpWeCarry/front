import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, PropsWithChildren, ReactNode } from 'react';

interface ModalProps {
  width?: string;
  height?: string;
  hasCloseButton?: boolean;
  onClose: () => void;
  className?: string;
  portalTarget?: HTMLElement;
}

const Modal = ({
  width = '818px',
  height = '500px',
  hasCloseButton = true,
  onClose,
  children,
  className = '',
  portalTarget = document.body,
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
        className='absolute top-50% left-50% -translate-x-50% -translate-y-50% cursor-default z-50'
        onClick={(e) => e.stopPropagation()}
        style={{ width, height }}
      >
        {hasCloseButton && <Modal.CloseButton onClose={onClose} />}
        <Modal.InnerModal className={className}>{children}</Modal.InnerModal>
      </div>
    </div>,
    portalTarget
  );
};

Modal.CloseButton = function ({ onClose }: { onClose: () => void }) {
  return (
    <div className='text-white h-10 flex items-center justify-end'>
      <button onClick={onClose} className='hover:text-gray-300'>
        <XMarkIcon width={24} />
      </button>
    </div>
  );
};

interface InnerModalProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

Modal.InnerModal = function ({
  children,
  className = '',
  px = '50px',
  py = '30px',
}: InnerModalProps) {
  return (
    <div
      className={`bg-white rounded-[20px] ${className}`}
      style={{
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      {children}
    </div>
  );
};

Modal.Title = function ({ children }: { children: ReactNode }) {
  return <h1 className='text-[22px] font-medium mb-3'>{children}</h1>;
};

export default Modal;
