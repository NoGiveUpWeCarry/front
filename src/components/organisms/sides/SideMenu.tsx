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
import { NotificationTypes } from '@/apis/notification.api';
import Popup from '@/components/molecules/Popup';
import formatTimeAgo from '@/utils/formatTimeAgo';

interface NotificationProp {
  notificationId: number;
  type: NotificationTypes;
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
      setMessages((prevMessages) => {
        const newNotifications = missedNotifications.notifications
          .map((notification) => ({
            notificationId: notification.notificationId,
            type: notification.type,
            message: notification.message,
            senderNickname: notification.sender.nickname,
            senderProfileUrl: notification.sender.profileUrl,
            timestamp: formatTimeAgo(notification.createdAt),
            isRead: notification.isRead,
          }))
          .filter(
            (newNotification) =>
              !prevMessages.some(
                (existing) =>
                  existing.notificationId === newNotification.notificationId
              )
          );

        return [...prevMessages, ...newNotifications];
      });
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
      const data = JSON.parse(event.data);

      const formattedData: NotificationProp = {
        notificationId: data.notificationId,
        type: data.type,
        message: data.message,
        senderNickname: data.senderNickname,
        senderProfileUrl: data.senderProfileUrl,
        timestamp: formatTimeAgo(data.timestamp),
        isRead: data.isRead,
      };

      setMessages((prevMessages) => {
        if (
          !prevMessages.some(
            (msg) => msg.notificationId === formattedData.notificationId
          )
        ) {
          return [formattedData, ...prevMessages];
        }
        return prevMessages;
      });
      setNewNotification(true);
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
    markAsRead({ notificationId: String(notificationId) });
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

  console.log(userInfo?.profileUrl);

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

      <div className='flex lg:flex-col lg:py-[20px] justify-between items-center h-full bg-green-200'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          <Logo />
        </div>
        <Menu items={menuItems} />
        {/* <div className='flex'>인풋</div> */}
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
                            </div>{' '}
                          </div>
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
            src={userInfo?.profileUrl || undefined}
            onClick={() => setShowLogin((prev) => !prev)}
          />
          {showLogin &&
            (isLoggedIn ? (
              <Popup
                position='right'
                popupHandler={[
                  {
                    onClick: () => {
                      navigate(`/@${userInfo?.nickname}`);
                      setShowLogin(false);
                    },
                    text: '마이페이지',
                    icon: <Icon type='user' className='w-6' />,
                  },
                  {
                    onClick: () => {
                      mutate(undefined, {
                        onSuccess: () => logout(),
                      });
                      setShowLogin(false);
                    },
                    text: '로그아웃',
                    icon: (
                      <Icon
                        type={isLoggedIn ? 'logout' : 'user'}
                        className='w-6'
                      />
                    ),
                  },
                ]}
                innerClassname='top-[-30%]'
              />
            ) : (
              <Popup
                position='right'
                popupHandler={[
                  {
                    onClick: () => {
                      navigate('/login');
                      setShowLogin(false);
                    },
                    text: '로그인/회원가입',
                    icon: <Icon type='user' className='w-6' />,
                  },
                ]}
                innerClassname='top-[10px]'
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
