import { API_PATH } from '@/apis/api-path';
import fetcher from '@/utils/fetcher';

export type NotificationTypes =
  | 'follow'
  | 'comment'
  | 'like'
  | 'application'
  | 'applicationStatus'
  | 'privateChat'
  | 'groupChat';

interface Notification {
  notificationId: number;
  userId: number;
  senderId: number;
  type: NotificationTypes;
  message: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    nickname: string;
    profileUrl: string;
  };
}

export interface MissedNotificationsResponse {
  notifications: Notification[];
}

// 읽지 않은 알림조회
export const fetchMissedNotifications = async () => {
  const apiPath = API_PATH.notificationUnread;
  const response = await fetcher<MissedNotificationsResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

// 알림 읽음 처리
export const patchNotificationsAsRead = async (notificationId: string) => {
  const apiPath = API_PATH.notificationsAsRead.replace(
    ':notificationId',
    notificationId
  );
  const response = await fetcher<MissedNotificationsResponse>({
    url: apiPath,
    method: 'PATCH',
  });
  return response.data;
};
