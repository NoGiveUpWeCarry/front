import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';
import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import SearchModal from '@/components/organisms/modals/SearchModal';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/queries/auth.query';
import {
  useFetchMissedNotifications,
  usePatchNotificationAsRead,
} from '@/hooks/queries/notification.query';
import { createPortal } from 'react-dom';
import Popup from '@/components/molecules/Popup';

interface NotificationProp {
  notificationId: number;
  type: 'follow' | 'application' | 'applicationStatus' | 'like' | 'comment';
  message: string;
  senderNickname: string;
  senderProfileUrl: string;
  timestamp: string;
  isRead?: boolean;
}

const SideMenu = () => {
  const navigate = useNavigate();
  const token = useAuthStore.getState().accessToken;

  const { logout, isLoggedIn, userInfo } = useAuthStore((state) => state);
  const { mutate } = useLogout();
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();

  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const [messages, setMessages] = useState<NotificationProp[]>([]);

  const notificationRef = useRef<HTMLDivElement>(null);
  const { data: missedNotifications } = useFetchMissedNotifications();
  const { mutate: markAsRead } = usePatchNotificationAsRead();

  useEffect(() => {
    if (missedNotifications?.notifications) {
      const formattedNotifications: NotificationProp[] =
        missedNotifications.notifications.map((notification) => ({
          notificationId: notification.notificationId,
          type: notification.type,
          message: notification.message,
          senderNickname: notification.sender.nickname,
          senderProfileUrl: notification.sender.profileUrl,
          timestamp: notification.createdAt,
          isRead: notification.isRead,
        }));

      setMessages(formattedNotifications);
    }
  }, [missedNotifications]);

  useEffect(() => {
    if (!token) return;
    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BASE_SERVER_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    eventSource.addEventListener('open', () => {
      console.log('✅ SSE 연결 성공');
    });
    eventSource.addEventListener('message', (event) => {
      console.log('📩 새 알림 도착');
      const data: NotificationProp = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewNotification(true);
    });
    eventSource.addEventListener('error', () => {
      eventSource.close();
    });
    return () => {
      eventSource.close();
    };
  }, [token]);

  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false);
  };

  const handleCheckNotificationClick = (notificationId: number) => {
    console.log(`🔵 알림 ${notificationId} 읽음 처리 요청`);
    markAsRead({ notificationId: String(notificationId) });
    // ✅ 상태에서 즉시 제거
    setMessages((prevMessages) =>
      prevMessages.filter(
        (message) => message.notificationId !== notificationId
      )
    );
  };

  const menuItems: {
    type: 'search' | 'bell' | 'mail' | 'home' | 'star';
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

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

      <div className='flex flex-col justify-between items-center h-full py-[20px]'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          <Logo />
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
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className='flex w-full justify-start text-[14px] items-center gap-[10px]'
                        >
                          <Avatar src={message.senderProfileUrl} size='xs' />
                          <div>{message.message}</div>
                          <div
                            onClick={() =>
                              handleCheckNotificationClick(
                                message.notificationId
                              )
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
            onClick={() => setShowLogin((prev) => !prev)}
          />
          {showLogin && (
            <Popup
              popupHandler={[
                {
                  onClick: () => {
                    navigate(isLoggedIn ? `/@${userInfo?.nickname}` : '/login');
                    setShowLogin(false);
                  },
                  text: isLoggedIn ? '마이페이지' : '로그인',
                  icon: <Icon type='user' className='w-6' />,
                },
                {
                  onClick: () => {
                    if (isLoggedIn) {
                      mutate(undefined, {
                        onSuccess: () => {
                          logout();
                        },
                      });
                    } else {
                      navigate('/signup');
                    }
                    setShowLogin(false);
                  },
                  text: isLoggedIn ? '로그아웃' : '회원가입',
                  icon: (
                    <Icon
                      type={isLoggedIn ? 'logout' : 'user'}
                      className='w-6'
                    />
                  ),
                },
              ]}
              position='right'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
