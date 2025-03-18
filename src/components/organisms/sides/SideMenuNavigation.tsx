import Menu from '@/components/molecules/Menu';
import { useNavigate } from 'react-router-dom';

interface SideMenuNavigationProps {
  handleNotificationClick: () => void;
  newNotification: boolean;
  openSearchModal: () => void;
}

const SideMenuNavigation = ({
  handleNotificationClick,
  newNotification,
  openSearchModal,
}: SideMenuNavigationProps) => {
  const navigate = useNavigate();

  const menuItems: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    label?: string;
    onClick?: () => void;
    hasNotification?: boolean;
  }[] = [
    {
      type: 'bell',
      label: '알림',
      onClick: handleNotificationClick,
      hasNotification: newNotification,
    },
    { type: 'mail', label: '메세지', onClick: () => navigate('/chat') },
    { type: 'home', label: '피드', onClick: () => navigate('/') },
    { type: 'search', label: '검색', onClick: openSearchModal },
    {
      type: 'star',
      label: '커넥션 허브',
      onClick: () => navigate('/projects'),
    },
  ];
  return <Menu items={menuItems} />;
};

export default SideMenuNavigation;
