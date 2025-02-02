import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import {
  fetchMissedNotifications,
  patchNotificationsAsRead,
  MissedNotificationsResponse,
} from '@/apis/notification.api';
import useAuthStore from '@/store/authStore';

// 읽지 않은 알림 조회
export const useFetchMissedNotifications = (): UseQueryResult<
  MissedNotificationsResponse,
  Error
> => {
  const token = useAuthStore.getState().accessToken; // ✅ 토큰 가져오기
  console.log('useFetchMissedNotifications 요청됨');
  return useQuery<MissedNotificationsResponse>({
    queryKey: ['missedNotifications'],
    queryFn: fetchMissedNotifications,
    enabled: !!token, // ✅ 토큰이 있을 때만 실행
    staleTime: 60 * 1000, // 1분 캐싱
    gcTime: 5 * 60 * 1000, // 5분 후 캐시 삭제
    retry: 3,
  });
};

// 특정 알림 읽음 처리
export const usePatchNotificationAsRead = (): UseMutationResult<
  unknown,
  Error,
  { notificationId: string },
  unknown
> => {
  return useMutation({
    mutationFn: async ({ notificationId }: { notificationId: string }) => {
      return patchNotificationsAsRead(notificationId);
    },
    onSuccess: (_, { notificationId }) => {
      queryClient.invalidateQueries({ queryKey: ['missedNotifications'] });
      console.log(`알림 ${notificationId} 읽음 처리 성공`);
    },
    onError: (error) => {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    },
  });
};

// 모든 알림 읽음 처리
export const usePatchAllNotificationsAsRead = (): UseMutationResult<
  unknown,
  Error,
  void,
  unknown
> => {
  return useMutation({
    mutationFn: async () => {
      const missedNotifications =
        queryClient.getQueryData<MissedNotificationsResponse>([
          'missedNotifications',
        ]);
      if (!missedNotifications) return;

      await Promise.all(
        missedNotifications.notifications.map((notification) =>
          patchNotificationsAsRead(String(notification.notificationId))
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missedNotifications'] });
      console.log('모든 알림 읽음 처리 완료');
    },
    onError: (error) => {
      console.error('모든 알림 읽음 처리 중 오류 발생:', error);
    },
  });
};
