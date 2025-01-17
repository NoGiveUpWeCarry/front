import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import SearchModal from '@/components/organisms/modals/SearchModal';
import Icon from '@/components/atoms/Icon';

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
            src='/src/assets/images/example.svg'
            alt='User Avatar'
            className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
            onClick={handleAvatarClick}
          />

          {showLogin && (
            <div
              className='
              absolute
              top-[-30%]
              w-max
              left-full
              transform
              -translate-y-1/2
              transition-opacity
              duration-300

            '
            >
              <div className='flex ml-4 w-full bg-white rounded-xl items-center px-[10px] py-[10px] drop-shadow-lg'>
                <div className='flex w-full flex-col gap-[10px]'>
                  <button
                    className='group flex w-full rounded-lg px-1 py-2 items-center gap-[20px] cursor-pointer hover:bg-[#f3f4f6]'
                    onClick={() => {
                      navigate('/login');
                      setShowLogin(false);
                    }}
                  >
                    <Icon
                      type='user'
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='flex text-[18px] text-[#48484a]'>
                      로그인
                    </div>
                  </button>
                  <button
                    className='group flex w-full rounded-lg px-1 py-1.5 items-center gap-[20px] cursor-pointer hover:bg-[#f3f4f6]'
                    onClick={() => {
                      alert('/signup');
                      setShowLogin(false);
                    }}
                  >
                    <Icon
                      type='join'
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='flex text-[18px] text-[#48484a]'>
                      회원가입
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
