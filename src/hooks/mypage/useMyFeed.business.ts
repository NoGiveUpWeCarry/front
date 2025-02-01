import { useGetFeeds } from '@/hooks/queries/mypage/feed';
import { useMyPageStore } from '@/store/mypageStore';
import { useShallow } from 'zustand/shallow';

const useMyFeed = () => {
  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const feedQuery = useGetFeeds(ownerId);

  return {
    ...feedQuery,
  };
};

export default useMyFeed;
