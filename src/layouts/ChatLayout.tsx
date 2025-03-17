import MobileNav from '@/components/organisms/sides/MobileNav';
import SideMenu from '@/components/organisms/sides/SideMenu';
import { useChat } from '@/hooks/chat/useChat';
import SubLayout from '@/layouts/SubLayout';

const ChatLayout = () => {
  useChat();
  return (
    <SubLayout>
      <div className='h-[52px] lg:h-full w-screen lg:w-fit bg-white lg:bg-inherit'>
        <div className='hidden lg:block w-full h-full'>
          <SideMenu />
        </div>
        <div className='block lg:hidden w-full h-full'>
          <MobileNav>
            <MobileNav.Logo />
            <MobileNav.Actions />
            <MobileNav.Menu />
            <MobileNav.Notification />
          </MobileNav>
        </div>
      </div>
    </SubLayout>
  );
};

export default ChatLayout;
