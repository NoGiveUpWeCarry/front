import NotificationList from '@/components/organisms/sides/NotificationList';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

const SideMenuNotification = () => {
  const {
    messages,
    markNotificationAsRead,
    showNotificationBox,
    setShowNotificationBox,
  } = useNotification();

  const notificationRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: notificationRef,
    handler: () => setShowNotificationBox(false),
    eventType: 'mousedown',
  });

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
          <NotificationList
            messages={messages}
            onDelete={markNotificationAsRead}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SideMenuNotification;
