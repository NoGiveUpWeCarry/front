import Button from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const TabButton = ({
  isActive,
  children,
  ...rest
}: PropsWithChildren<IProps>) => {
  return (
    <Button
      width='164px'
      height='28px'
      radius='sm'
      variants='outline'
      className={cn(
        isActive ? 'bg-white font-medium' : 'bg-none text-darkgray font-normal',
        '!w-full'
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TabButton;
