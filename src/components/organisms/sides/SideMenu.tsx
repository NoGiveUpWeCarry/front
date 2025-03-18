import { useState } from 'react';
import SearchModal from '@/components/organisms/modals/SearchModal';
import { useModal } from '@/hooks/useModal';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';
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

  const { newNotification, setNewNotification } = useNotification();
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false);
  };

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      <div className='flex flex-col lg:py-[20px] justify-between items-center h-full'>
        <SideMenuLogo />
        <SideMenuNavigation
          handleNotificationClick={handleNotificationClick}
          newNotification={newNotification}
          openSearchModal={openSearchModal}
        />
        <SideMenuNotification
          setShowNotificationBox={setShowNotificationBox}
          showNotificationBox={showNotificationBox}
        />
        <SideMenuProfile />
      </div>
    </>
  );
};

export default SideMenu;
