import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const SideMenuNotification = () => {
  const {
    messages,
    markNotificationAsRead,
    showNotificationBox,
    setShowNotificationBox,
  } = useNotification();

  const notificationRef = useRef<HTMLDivElement | null>(null);

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

  if (!showNotificationBox) return null;

  return createPortal(
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
  );
};

export default SideMenuNotification;
