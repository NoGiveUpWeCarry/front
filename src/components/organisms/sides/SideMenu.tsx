import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import SearchModal from '@/components/organisms/modals/SearchModal';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import Popup from '@/components/molecules/Popup';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';

const SideMenu = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore((state) => state);
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef(null);
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();

  const {
    messages,
    newNotification,
    markNotificationAsRead,
    setNewNotification,
  } = useNotification();
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false);
  };

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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationBox]);

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

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      <div className='flex lg:flex-col lg:py-[20px] justify-between items-center h-full'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          {' '}
          <Logo />{' '}
        </div>
        <Menu items={menuItems} />

        {showNotificationBox &&
          createPortal(
            <div className='fixed inset-0 flex items-center justify-center z-[1000]'>
              <div
                ref={notificationRef}
                className='absolute left-[90px] top-[50px] w-[370px] h-[700px] bg-white bg-opacity-95 rounded-xl drop-shadow-lg px-[20px] py-[20px] overflow-y-auto z-50'
              >
                <div className='flex w-full flex-col items-center gap-[10px]'>
                  <div className='text-[18px] font-semibold text-[#48484a]'>
                    알림 📫
                  </div>
                  {messages.length === 0 ? (
                    <div className='text-[16px] text-[#828282]'>
                      현재 새로운 알림이 없습니다.
                    </div>
                  ) : (
                    <div className='flex w-full flex-col gap-[20px]'>
                      {messages.map((message) => (
                        <div
                          key={message.notificationId}
                          className='flex w-full justify-start text-[14px] items-center gap-[10px]'
                        >
                          <Avatar
                            src={message.senderProfileUrl || undefined}
                            size='xs'
                          />
                          <div>
                            <div>{message.message}</div>
                            <div className='text-[12px] text-gray-500'>
                              {message.timestamp}
                            </div>
                          </div>
                          <div
                            onClick={() =>
                              markNotificationAsRead(message.notificationId)
                            }
                          >
                            <Icon
                              type='trash'
                              color='black'
                              className='w-[20px] h-[20px] cursor-pointer'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )}

        <div className='relative' ref={loginRef}>
          <Avatar
            size='sm'
            alt='User Avatar'
            className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
            src={userInfo?.profileUrl || undefined}
            onClick={() => setShowLogin((prev) => !prev)}
          />
          {showLogin && (
            <Popup
              position='right'
              popupHandler={[
                {
                  onClick: () => navigate(`/@${userInfo?.nickname}`),
                  text: '마이페이지',
                  icon: <Icon type='user' className='w-6' />,
                },
                {
                  onClick: () => logout(),
                  text: '로그아웃',
                  icon: <Icon type='logout' className='w-6' />,
                },
              ]}
              innerClassname='top-[-30%]'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
