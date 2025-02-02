import { Outlet } from 'react-router-dom';
import SideMenu from '@/components/organisms/sides/SideMenu';

const SubLayout = () => {
  return (
    <div className='min-h-screen flex px-[10px]'>
      <div className='sticky top-0 h-screen w-[68px] '>
        <SideMenu />
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[1240px] w-full mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SubLayout;
