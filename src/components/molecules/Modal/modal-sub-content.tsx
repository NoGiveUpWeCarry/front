import { PropsWithChildren } from 'react';

interface ModalSubContentProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

const ModalSubContent = ({
  children,
  className = '',
}: ModalSubContentProps) => {
  return (
    <div
      className={`w-full h-fit flex flex-col gap-[10px] px-[20px] ${className}`}
    >
      {children}
    </div>
  );
};

export default ModalSubContent;
