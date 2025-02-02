import fetcher from '@/utils/fetcher';

export const followUser = async ({ targetId }: { targetId: number }) => {
  const response = await fetcher({
    url: `/follow/${targetId}`,
    method: 'POST',
  });
  return response.data;
};
