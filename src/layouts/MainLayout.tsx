import { Outlet, useLocation } from 'react-router-dom';
import SideMenu from '@/components/organisms/sides/SideMenu';
import MainSideBar from '@/components/organisms/sides/MainSideBar';
import MobileNav from '@/components/organisms/sides/MobileNav';
import useMobileNavStore from '@/store/mobileNavStore';
import { useEffect } from 'react';
import { useSearchModal } from '@/store/modals/searchModalstore';
import SearchModal from '@/components/organisms/modals/SearchModal';

const MainLayout = () => {
  const preventInfo = ['/login'];
  const location = useLocation();
  const { isNavShowed, setNavHide, setNavShow } = useMobileNavStore();

  const { isModalOpen, openModal, closeModal } = useSearchModal();

  useEffect(() => {
    if (
      window.location.href.includes('q=') &&
      !window.location.href.includes('type=page')
    ) {
      openModal();
    }
  }, [location]);

  useEffect(() => {
    const isFeedDetailPage = /^\/feed\/\d+$/.test(location.pathname);
    if (isFeedDetailPage) {
      setNavHide();
    } else {
      setNavShow();
    }
  }, [location.pathname, setNavHide, setNavShow]);

  return (
    <div className='min-h-screen flex flex-col lg:flex-row lg:px-[10px] font-pretendard'>
      {isNavShowed && (
        <div className='sticky top-0 w-full lg:w-[68px] h-[52px] lg:h-screen lg:px-4 flex items-center justify-between z-50'>
          <div className='hidden lg:block w-full h-full'>
            <SideMenu />
          </div>
          <div className='lg:hidden w-full h-full bg-white'>
            <MobileNav>
              <MobileNav.Logo />
              <MobileNav.Search />
              <MobileNav.Actions />
              <MobileNav.Notification />
              <MobileNav.Menu />
            </MobileNav>
          </div>
        </div>
      )}
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[800px] w-full mx-auto lg:py-6 py-2'>
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
