import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import SearchModal from '@/components/organisms/modals/SearchModal';

const SideMenu = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  // const [isLoggedIn] = useAuth(useShallow((state) => [state.isLoggedIn]));
  const isLoggedIn = true;
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();
  const loginRef = useRef<HTMLDivElement>(null);

  const menuItems: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    label: string;
    onClick?: () => void;
  }[] = [
    {
      type: 'bell',
      label: '알림',
      onClick: () => alert('네비게이션 연결해주세요'),
    },
    {
      type: 'mail',
      label: '메세지',
      onClick: () => navigate('/chat'),
    },
    { type: 'home', label: '피드', onClick: () => navigate('/') },
    {
      type: 'search',
      label: '검색',
      onClick: () => navigate('/roleselect'),
    },
    {
      type: 'star',
      label: '커넥션 허브',
      onClick: () => navigate('/connectionhub'),
    },
  ];

  const handleAvatarClick = () => {
    setShowLogin((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setShowLogin(false);
      }
    };

    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogin]);

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      <div className='flex flex-col justify-between items-center h-full py-[20px]'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          <Logo />
        </div>

        <Menu items={menuItems} />

        <div className='relative' ref={loginRef}>
          <Avatar
            size='sm'
            src='/src/assets/Genericavatar.svg'
            alt='User Avatar'
            className='cursor-pointer border-4 border-transparent hover:border-gray-300 transition-shadow duration-300'
            onClick={handleAvatarClick}
          />

          {showLogin && (
            <div
              className='
              absolute
              top-[50%]
              left-full
              ml-4
              transform
              -translate-y-1/2
              w-[120px]
              transition-opacity
              duration-300
            '
            >
              <button
                className='w-full text-left px-4 py-2 text-[14px] text-gray-800 hover:text-black'
                onClick={() => {
                  alert('로그인');
                  setShowLogin(false);
                }}
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
