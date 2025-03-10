import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Logo from '@/components/atoms/Logo';
import MobileHamburgarMenu from '@/components/organisms/sides/MobileHamburgarMenu';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';
import useAuthStore from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const { messages, markNotificationAsRead } = useNotification();
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      className='mobile-nav border-b border-lightgray w-full h-full relative'
      ref={menuRef}
    >
      <div className='w-full h-full flex items-center px-2 justify-between relative'>
        <nav
          aria-label='모바일 메뉴'
          className='flex flex-row items-center mr-1 w-full'
        >
          <a href='/' className='w-[40px] h-[16px]'>
            <Logo width='44px' height='18px' />
          </a>
          <a href='/search' className='w-full h-full ml-3'>
            <div className='w-full h-8 px-3 py-[6px] border rounded-lg border-none bg-[#f1f1f7] flex items-center'>
              <div className='w-5 h-5'>
                <Icon type='search' className='text-[#838383]' />
              </div>
              <input
                className='w-full bg-transparent text-sm justify-self-center h-full outline-none'
                placeholder='검색하기'
              />
            </div>
          </a>
        </nav>
        <nav className='flex w-[102px] h-8 justify-end items-center gap-2'>
          {isLoggedIn && (
            <div
              className='w-6 h-6'
              onClick={() => setIsAlarmOpen(!isAlarmOpen)}
            >
              <Icon type='bellSolid' className='text-[#838383]' />
            </div>
          )}
          <div className='w-6 h-6' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon
              type={isMenuOpen ? 'xmark' : 'bar3'}
              className='text-[#838383]'
            />
          </div>
        </nav>
      </div>
      {isMenuOpen && <MobileHamburgarMenu />}
      {isAlarmOpen && (
        <div className='absolute mt-3 px-1 py-2 flex w-full flex-col items-center gap-2 bg-white'>
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
                  className='flex w-full justify-start text-[14px] items-center gap-[10px] '
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
      )}
    </div>
  );
};

export default MobileNav;
