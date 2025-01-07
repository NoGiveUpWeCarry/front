import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, PropsWithChildren } from 'react';

interface ModalProps {
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
}: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className='w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 z-50 flex justify-center items-center cursor-pointer'
      onClick={onClose}
    >
      <div
        className={`absolute top-50% left-50% -translate-x-50% -translate-y-50% cursor-default $`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {hasCloseButton && <Modal.CloseButton onClose={onClose} />}
        <Modal.InnerModal className={className}>{children}</Modal.InnerModal>
      </div>
    </div>
  );
};

Modal.CloseButton = ({ onClose }: { onClose: () => void }) => (
  <div className='text-white h-10 flex items-center justify-end'>
    <button onClick={onClose}>
      <XMarkIcon width={24} />
    </button>
  </div>
);

Modal.InnerModal = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={`w-full h-full bg-white rounded-[20px] px-[50px] py-[30px] ${className}`}
  >
    {children}
  </div>
);

export default Modal;
