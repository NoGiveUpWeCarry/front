import SearchModal from '@/components/organisms/modals/SearchModal';
import { useModal } from '@/hooks/useModal';
import SideMenuLogo from '@/components/molecules/SideMenuLogo';
import SideMenuProfile from '@/components/organisms/sides/SideMenuProfile';
import SideMenuNavigation from '@/components/organisms/sides/SideMenuNavigation';
import SideMenuNotification from '@/components/organisms/sides/SideMenuNotification';

const SideMenu = () => {
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      <div className='flex flex-col lg:py-[20px] justify-between items-center h-full'>
        <SideMenuLogo />
        <SideMenuNavigation openSearchModal={openSearchModal} />
        <SideMenuNotification />
        <SideMenuProfile />
      </div>
    </>
  );
};

export default SideMenu;
