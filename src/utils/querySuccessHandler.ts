import queryClient from '@/utils/queryClient';

export const querySuccessHandler = (queryKey: string, options?: any[]) => {
  queryClient.invalidateQueries({ queryKey: [queryKey, ...options!] });
};
