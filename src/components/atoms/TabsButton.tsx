import Button from '@/components/atoms/Button';
import { PropsWithChildren } from 'react';

interface IProps {
  isActive: boolean;
  onClick: () => void;
}

const TabsButton = ({
  isActive,
  onClick,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <Button
      width='164px'
      height='28px'
      radius='sm'
      variants='outline'
      className={
        isActive ? 'bg-white font-medium' : 'bg-none text-darkgray font-normal'
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TabsButton;
