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
import Popup from '@/components/molecules/Popup';

import {
  useFetchMissedNotifications,
  usePatchNotificationAsRead,
} from '@/hooks/queries/notification.query';
import { createPortal } from 'react-dom';

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
      // `${import.meta.env.VITE_LOCAL_URL}/notifications/stream`,
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
      console.log('🔴 SSE 연결 실패. 10초 후 재시도...');
      eventSource.close();
      setTimeout(() => {
        window.location.reload();
      }, 20000);
    });
    return () => {
      console.log('🔴 SSE 연결 종료');
      eventSource.close();
    };
  }, [token]);

  // ✅ 알림창을 열 때 읽음 처리
  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false);
    messages.forEach((message) => {
      if (!message.isRead) {
        console.log(`🔵 알림 ${message.notificationId} 읽음 처리 요청`);
        markAsRead({ notificationId: String(message.notificationId) });
      }
    });
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
                      </div>
                    ))}
                  </div>
                )}
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
              position='right'
              popupHandler={[
                {
                  onClick: () => {
                    if (isLoggedIn) {
                      navigate(`/@${userInfo?.nickname}`);
                    } else {
                      navigate('/login');
                    }
                    setShowLogin(false);
                  },
                  text: isLoggedIn ? '마이페이지' : '로그인',
                  icon: (
                    <Icon
                      type='user'
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                  ),
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
                      type={isLoggedIn ? 'logout' : 'join'}
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
