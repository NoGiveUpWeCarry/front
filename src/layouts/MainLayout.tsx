import { Outlet, useLocation } from 'react-router-dom';
import SideMenu from '@/components/organisms/sides/SideMenu';
import MainSideBar from '@/components/organisms/sides/MainSideBar';
import MobileNav from '@/components/organisms/sides/MobileNav';
import { useEffect } from 'react';
import { useSearchModal } from '@/store/modals/searchModalstore';
import SearchModal from '@/components/organisms/modals/SearchModal';

const MainLayout = () => {
  const preventInfo = ['/login'];
  const location = useLocation();
  const { isModalOpen, openModal, closeModal } = useSearchModal();

  useEffect(() => {
    if (
      window.location.href.includes('q=') &&
      !window.location.href.includes('type=page')
    ) {
      openModal();
    }
  }, [location]);

  return (
    <div className='min-h-screen flex flex-col lg:flex-row lg:px-[10px]'>
      <div className='sticky top-0 w-full lg:w-[68px] h-[52px] lg:h-screen lg:px-4 flex items-center justify-between z-50'>
        <div className='hidden lg:block w-full h-full'>
          <SideMenu />
        </div>
        <div className='block lg:hidden w-full h-full'>
          <MobileNav />
        </div>
      </div>
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[800px] w-full mx-auto py-6'>
          {isModalOpen && <SearchModal onClose={closeModal} />}
          <Outlet />
        </div>
      </div>
      {!preventInfo.includes(location.pathname) && (
        <div className='sticky top-0 h-screen w-[330px] p-2 hidden lg:block !z-1'>
          <MainSideBar />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
