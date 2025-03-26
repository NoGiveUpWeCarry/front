import { Outlet } from 'react-router-dom';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

const SubLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex lg:px-[10px] flex-col lg:flex-row'>
      <div className='sticky top-0 lg:w-[68px] w-0 z-10'>{children}</div>
      <div className='flex flex-1 overflow-y-auto justify-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default SubLayout;
