import { useEffect, useState, useRef } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import Avatar from '@/components/atoms/Avatar';
import useAuthStore from '@/store/authStore';

interface MessageProp {
  type: 'follow' | 'application' | 'applicationStatus' | 'like' | 'comment';
  message: string;
  senderNickname: string;
  senderProfileUrl: string;
  timestamp: string;
}

const Notifications = () => {
  const token = useAuthStore.getState().accessToken;
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [newNotification, setNewNotification] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // SSE 연결
  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BASE_SERVER_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    eventSource.addEventListener('message', (event) => {
      const data: MessageProp = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      setNewNotification(true);
    });

    eventSource.addEventListener('error', () => {
      eventSource.close();
      setTimeout(() => window.location.reload(), 20000);
    });

    return () => eventSource.close();
  }, [token]);

  // 알림창 외부 클릭 시 닫기
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotificationBox]);

  return (
    <div>
      <button
        onClick={() => {
          setShowNotificationBox((prev) => !prev);
          setNewNotification(false);
        }}
      >
        🔔 {newNotification && <span className='text-red-500'>*</span>}
      </button>

      {showNotificationBox && (
        <div
          ref={notificationRef}
          className='absolute left-[90px] top-[50px] w-[370px] h-[700px] bg-white rounded-xl drop-shadow-lg px-4 py-4 overflow-y-auto z-50'
        >
          <h3 className='text-lg font-semibold'>알림 📫</h3>
          {messages.length === 0 ? (
            <p className='text-gray-500'>새로운 알림이 없습니다.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className='flex items-center gap-2 text-sm'>
                <Avatar src={msg.senderProfileUrl} size='xs' />
                <span>
                  <strong>{msg.senderNickname}</strong>: {msg.message}
                </span>
                <small className='text-gray-400'>
                  {new Date(msg.timestamp).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
