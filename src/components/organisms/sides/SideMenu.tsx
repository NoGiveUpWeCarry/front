import SideMenuLogo from '@/components/molecules/SideMenuLogo';
import SideMenuProfile from '@/components/organisms/sides/SideMenuProfile';
import SideMenuNavigation, {
  SideMenuNav,
} from '@/components/organisms/sides/SideMenuNavigation';
import SideMenuNotification from '@/components/organisms/sides/SideMenuNotification';

const SideMenu = () => {
  return (
    <div className='flex flex-col lg:py-[20px] justify-between items-center h-full'>
      <SideMenuLogo />
      <SideMenuNavigation>
        <SideMenuNav.Bell />
        <SideMenuNav.Message />
        <SideMenuNav.Home />
        <SideMenuNav.Search />
        <SideMenuNav.ConnectionHub />
      </SideMenuNavigation>
      <SideMenuNotification />
      <SideMenuProfile />
    </div>
  );
};

export default SideMenu;
