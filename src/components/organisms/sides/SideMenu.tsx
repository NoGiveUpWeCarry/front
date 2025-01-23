import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import SearchModal from '@/components/organisms/modals/SearchModal';
import Icon from '@/components/atoms/Icon';
import useAuthStore from '@/store/authStore';
import { useShallow } from 'zustand/shallow';

const SideMenu = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const [isLoggedIn, userInfo] = useAuthStore(
    useShallow((state) => [state.isLoggedIn, state.userInfo])
  );

  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();

  const loginRef = useRef<HTMLDivElement>(null);

  const notificationRef = useRef<HTMLDivElement>(null);

  const menuItems: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    label: string;
    onClick?: () => void;
  }[] = [
    {
      type: 'bell',
      label: '알림',

      onClick: () => setShowNotificationBox((prev) => !prev),
    },
    {
      type: 'mail',
      label: '메세지',
      onClick: () => navigate('/chat'),
    },
    {
      type: 'home',
      label: '피드',
      onClick: () => navigate('/'),
    },
    {
      type: 'search',
      label: '검색',
      onClick: openSearchModal,
    },
    {
      type: 'star',
      label: '커넥션 허브',
      onClick: () => navigate('/connectionhub'),
    },
  ];

  // const handleAvatarClick = () => {
  //   if (isLoggedIn) {
  //     navigate('@닉네임');
  //   } else {
  //     setShowLogin((prev) => !prev);
  //   }
  // };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotificationBox(false);
      }
    };

    if (showNotificationBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationBox]);

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

      <div className='flex flex-col justify-between items-center h-full py-[20px]'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          <Logo />
        </div>

        <Menu items={menuItems} />

        {showNotificationBox && (
          <div
            ref={notificationRef}
            className='
              absolute
              left-[90px]
              top-[50px]
              transform
              transition-opacity
              duration-300
              w-[400px]
              h-[700px]
              bg-white
              bg-opacity-95
              rounded-xl
              drop-shadow-lg
              px-[20px]
              py-[20px]
              overflow-y-auto
              z-50
            '
          >
            <div className='flex w-full flex-col items-center gap-[10px]'>
              <div className='text-[20px] font-semibold text-[#48484a]'>
                알림 📫
              </div>
              <div className='text-[20px] text-[#828282]'>
                현재 새로운 알림이 없습니다.
              </div>
              <div className='flex w-full flex-col gap-[20px]'>
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex items-start font-semibold text-[16px]'>
                    오늘
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>채윤님이 회원님을 팔로우하기 시작했습니다.</div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트 지원 마감기한이 일주일
                      남았습니다.
                    </div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트에서 지원을 수락했습니다.
                      프로젝트를 시작해 보세요!
                    </div>
                  </div>
                  <div className='border-b-2 border-[#eaeaea]'></div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex items-start font-semibold text-[16px]'>
                    어제
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>채윤님이 회원님을 팔로우하기 시작했습니다.</div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트 지원 마감기한이 일주일
                      남았습니다.
                    </div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트에서 지원을 수락했습니다.
                      프로젝트를 시작해 보세요!
                    </div>
                  </div>
                  <div className='border-b-2 border-[#eaeaea]'></div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex items-start font-semibold text-[16px]'>
                    어제
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>채윤님이 회원님을 팔로우하기 시작했습니다.</div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트 지원 마감기한이 일주일
                      남았습니다.
                    </div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트에서 지원을 수락했습니다.
                      프로젝트를 시작해 보세요!
                    </div>
                  </div>
                  <div className='border-b-2 border-[#eaeaea]'></div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex items-start font-semibold text-[16px]'>
                    어제
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>채윤님이 회원님을 팔로우하기 시작했습니다.</div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트 지원 마감기한이 일주일
                      남았습니다.
                    </div>
                  </div>
                  <div className='flex w-full justify-start items-center gap-[10px]'>
                    <Avatar src='/src/assets/images/example.svg' />
                    <div>
                      채윤님이 올리신 프로젝트에서 지원을 수락했습니다.
                      프로젝트를 시작해 보세요!
                    </div>
                  </div>
                  <div className='border-b-2 border-[#eaeaea]'></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='relative' ref={loginRef}>
          <Avatar
            size='sm'
            alt='User Avatar'
            className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
            // onClick={handleAvatarClick}
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
                z-50
              '
            >
              <div className='flex ml-4 w-full bg-white rounded-xl items-center px-[10px] py-[10px] drop-shadow-lg'>
                <div className='flex w-full flex-col gap-[10px]'>
                  <button
                    className='group flex w-full rounded-lg px-1 py-2 items-center gap-[20px] cursor-pointer hover:bg-[#f3f4f6]'
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate(`@${userInfo?.nickname}`, {
                          state: { userId: userInfo?.userId },
                        });
                      } else {
                        navigate('/login');
                      }
                      setShowLogin(false);
                    }}
                  >
                    <Icon
                      type='user'
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='flex text-[18px] text-[#48484a]'>
                      {isLoggedIn ? '마이페이지' : '로그인'}
                    </div>
                  </button>
                  <button
                    className='group flex w-full rounded-lg px-1 py-1.5 items-center gap-[20px] cursor-pointer hover:bg-[#f3f4f6]'
                    onClick={() => {
                      if (isLoggedIn) {
                      } else {
                        navigate('/signup');
                      }

                      setShowLogin(false);
                    }}
                  >
                    <Icon
                      type={isLoggedIn ? 'logout' : 'join'}
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='flex text-[18px] text-[#48484a]'>
                      {isLoggedIn ? '로그아웃' : '회원가입'}
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
