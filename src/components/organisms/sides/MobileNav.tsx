import Icon from '@/components/atoms/Icon';
import Logo from '@/components/atoms/Logo';
import MobileHamburgarMenu from '@/components/organisms/sides/MobileHamburgarMenu';
import MobileNotification from '@/components/organisms/sides/MobileNotification';
import MobileSearchBar from '@/components/organisms/sides/MobileSearchBar';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import useAuthStore from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavLogo = () => {
  return (
    <a href='/' className='w-[40px] h-[16px]'>
      <Logo width='44px' height='18px' />
    </a>
  );
};

interface NavActionsProps {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onAlarmToggle: () => void;
}

const NavActions = ({
  isLoggedIn,
  isMenuOpen,
  onMenuToggle,
  onAlarmToggle,
}: NavActionsProps) => {
  return (
    <div className='flex h-8 justify-end items-center gap-2'>
      {isLoggedIn && (
        <div className='w-6 h-6' onClick={onAlarmToggle}>
          <Icon type='bellSolid' className='text-[#838383]' />
        </div>
      )}
      <div className='w-6 h-6 cursor-pointer' onClick={onMenuToggle}>
        <Icon type={isMenuOpen ? 'xmark' : 'bar3'} className='text-[#838383]' />
      </div>
    </div>
  );
};

const MobileNav = () => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 데스크톱일 경우 eventType 을 mouseDown 으로 수정하기
  useOutsideClick({
    ref: menuRef,
    handler: () => setIsMenuOpen(false),
    eventType: 'touchstart',
  });

  return (
    <div
      className='mobile-nav border-b border-lightgray w-full h-full relative'
      ref={menuRef}
    >
      <div className='w-full h-full flex items-center px-2 justify-between relative'>
        <nav
          aria-label='모바일 메뉴'
          className='flex justify-between items-center mr-1 w-full'
        >
          <NavLogo />
          <MobileSearchBar />
          <NavActions
            isLoggedIn={isLoggedIn}
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            onAlarmToggle={() => setIsAlarmOpen(!isAlarmOpen)}
          />
        </nav>
      </div>
      {isMenuOpen && <MobileHamburgarMenu />}
      <MobileNotification isOpen={isAlarmOpen} />
    </div>
  );
};

export default MobileNav;
