import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import {
  useFetchMissedNotifications,
  usePatchNotificationAsRead,
} from '@/hooks/queries/notification.query';
import formatTimeAgo from '@/utils/formatTimeAgo';
import useAuthStore from '@/store/authStore';

interface NotificationProp {
  notificationId: number;
  type: string;
  message: string;
  senderNickname: string;
  senderProfileUrl: string;
  timestamp: string;
  isRead?: boolean;
}

interface NotificationContextType {
  messages: NotificationProp[];
  newNotification: boolean;
  markNotificationAsRead: (notificationId: number) => void;
  setNewNotification: (value: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const token = useAuthStore.getState().accessToken;
  const [messages, setMessages] = useState<NotificationProp[]>([]);
  const [newNotification, setNewNotification] = useState<boolean>(false);
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

  const markNotificationAsRead = (notificationId: number) => {
    markAsRead({ notificationId: String(notificationId) });
    setMessages((prevMessages) =>
      prevMessages.filter(
        (message) => message.notificationId !== notificationId
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        messages,
        newNotification,
        markNotificationAsRead,
        setNewNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
