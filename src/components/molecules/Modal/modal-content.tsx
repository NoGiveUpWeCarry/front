import { PropsWithChildren } from 'react';

interface ModalContentProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

const ModalContent = ({
  children,
  className = '',
  px = '20px',
  py = '30px',
}: ModalContentProps) => {
  return (
    <div
      className={`flex ${className} h-[350px] overflow-y-scroll scrollbar-hide`}
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

export default ModalContent;
