import { Outlet, useLocation } from 'react-router-dom';
import SideMenu from '@/components/organisms/sides/SideMenu';
import SideBarRight from '@/components/organisms/sides/SideBar';

const MainLayout = () => {
  const preventInfo = ['/login'];
  const location = useLocation();

  return (
    <div className='min-h-screen flex'>
      <div className='sticky top-0 h-screen w-[68px] z-10'>
        <SideMenu />
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[800px] w-full mx-auto py-6'>
          <Outlet />
        </div>
      </div>

      {!preventInfo.includes(location.pathname) && (
        <div className='sticky top-0 h-screen w-[300px] p-2 hidden lg:block !z-1'>
          <SideBarRight />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
