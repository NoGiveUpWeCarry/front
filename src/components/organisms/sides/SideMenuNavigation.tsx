import Icon from '@/components/atoms/Icon';
import SearchModal from '@/components/organisms/modals/SearchModal';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';

const SideMenuNavMain = ({ children }: React.PropsWithChildren) => {
  return (
    <nav className='flex flex-col w-[68px] space-y-[80px] transition-all duration-300 ease-in-out items-center'>
      {children}
    </nav>
  );
};

interface SideMenuItemProps {
  type: 'bell' | 'mail' | 'home' | 'search' | 'star';
  label: string;
  onClick?: () => void;
  hasNotification?: boolean;
}

export const SideMenuItem = ({
  onClick,
  type,
  label,
  hasNotification,
}: SideMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className='relative group flex items-center cursor-pointer transition-all duration-300 ease-in-out'
    >
      <div className='relative flex-shrink-0'>
        <Icon
          type={type}
          className='h-6 w-6 text-[#838383] transition-all duration-200 ease-in-out group-hover:text-black'
        />
        {hasNotification && (
          <span className='absolute top-[1px] left-3 w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
        )}
      </div>

      <span className='absolute left-[30px] ml-2 text-[14px] whitespace-nowrap text-black transition-all duration-200 ease-in-out opacity-0 w-0 -translate-x-0 group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0 group-hover:text-black'>
        {label}
      </span>
    </button>
  );
};

const SideMenuBell = () => {
  const { setNewNotification, setShowNotificationBox, newNotification } =
    useNotification();

  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false);
  };

  return (
    <SideMenuItem
      onClick={handleNotificationClick}
      type='bell'
      hasNotification={newNotification}
      label='알림'
    />
  );
};

const SideMenuMail = () => {
  const navigate = useNavigate();
  return (
    <SideMenuItem
      type='mail'
      label='메세지'
      onClick={() => navigate('/chat')}
    />
  );
};

const SideMenuHome = () => {
  const navigate = useNavigate();
  return (
    <SideMenuItem type='home' label='피드' onClick={() => navigate('/')} />
  );
};

const SideMenuSearch = () => {
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();
  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      <SideMenuItem type='search' label='검색' onClick={openSearchModal} />
    </>
  );
};

const SideMenuConnectionHub = () => {
  const navigate = useNavigate();
  return (
    <SideMenuItem
      type='star'
      label='커넥션 허브'
      onClick={() => navigate('/projects')}
    />
  );
};

export const SideMenuNav = Object.assign(SideMenuNavMain, {
  Bell: SideMenuBell,
  Mail: SideMenuMail,
  Home: SideMenuHome,
  Search: SideMenuSearch,
  ConnectionHub: SideMenuConnectionHub,
});

export default SideMenuNav;
