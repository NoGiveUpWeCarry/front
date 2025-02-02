import { followUser } from '@/apis/follow';
import { useMutation } from '@tanstack/react-query';

export const useFollow = () => {
  return useMutation({
    mutationFn: ({ targetId }: { targetId: number }) =>
      followUser({ targetId }),
  });
};
