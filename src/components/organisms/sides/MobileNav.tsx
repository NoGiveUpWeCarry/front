import Icon from '@/components/atoms/Icon';
import Logo from '@/components/atoms/Logo';
import MobileHamburgarMenu from '@/components/organisms/sides/MobileHamburgarMenu';
import MobileNotification from '@/components/organisms/sides/MobileNotification';
import MobileSearchBar from '@/components/organisms/sides/MobileSearchBar';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import useAuthStore from '@/store/authStore';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

// 합성 컴포넌트간 공유할 context 타입
interface MobileNavContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isAlarmOpen: boolean;
  setIsAlarmOpen: (value: boolean) => void;
  isLoggedIn: boolean;
}

const MobileNavContext = createContext<MobileNavContextType | null>(null);

const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error(
      'MobileNav compound components must be used within MobileNav'
    );
  }
  return context;
};

// 메인 컴포넌트
const MobileNavMain = ({ children }: { children: React.ReactNode }) => {
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

  const memoizedValue = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
      isAlarmOpen,
      setIsAlarmOpen,
      isLoggedIn,
    }),
    [isMenuOpen, setIsMenuOpen, isAlarmOpen, setIsAlarmOpen, isLoggedIn]
  );

  return (
    <MobileNavContext.Provider value={memoizedValue}>
      <div
        className='mobile-nav border-b border-lightgray w-full h-full relative'
        ref={menuRef}
      >
        <div className='w-full h-full flex items-center px-2 justify-between relative'>
          <nav
            aria-label='모바일 메뉴'
            className='flex justify-between items-center mr-1 w-full'
          >
            {children}
          </nav>
        </div>
      </div>
    </MobileNavContext.Provider>
  );
};

// 서브 컴포넌트(합성 컴포넌트)
const MobileNavLogo = () => {
  return (
    <a href='/' className='w-[40px] h-[16px]'>
      <Logo width='44px' height='18px' />
    </a>
  );
};

const MobileNavSearch = () => {
  return <MobileSearchBar />;
};

const MobileNavActions = () => {
  const { isLoggedIn, isMenuOpen, isAlarmOpen, setIsMenuOpen, setIsAlarmOpen } =
    useMobileNav();

  return (
    <div className='flex h-8 justify-end items-center gap-2'>
      {isLoggedIn && (
        <div className='w-6 h-6' onClick={() => setIsAlarmOpen(!isAlarmOpen)}>
          <Icon type='bellSolid' className='text-[#838383]' />
        </div>
      )}
      <div
        className='w-6 h-6 cursor-pointer'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Icon type={isMenuOpen ? 'xmark' : 'bar3'} className='text-[#838383]' />
      </div>
    </div>
  );
};

const MobileNavMenu = () => {
  const { isMenuOpen } = useMobileNav();
  return isMenuOpen ? <MobileHamburgarMenu /> : null;
};

const MobileNavNotification = () => {
  const { isAlarmOpen } = useMobileNav();
  return <MobileNotification isOpen={isAlarmOpen} />;
};

export const MobileNav = Object.assign(MobileNavMain, {
  Logo: MobileNavLogo,
  Search: MobileNavSearch,
  Actions: MobileNavActions,
  Menu: MobileNavMenu,
  Notification: MobileNavNotification,
});

export default MobileNav;
