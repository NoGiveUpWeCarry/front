import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className='flex text-heading2 mt-[10px] justify-center'>{children}</h1>
  );
};

export default Title;
