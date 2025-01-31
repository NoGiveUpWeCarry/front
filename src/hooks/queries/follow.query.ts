import { followUser } from '@/apis/follow';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { useMutation } from '@tanstack/react-query';

export const useFollow = (nickname: string) => {
  return useMutation({
    mutationFn: ({ targetId }: { targetId: number }) =>
      followUser({ targetId }),
    onSuccess: () => {
      querySuccessHandler('profile-header-info', [nickname]);
    },
  });
};
