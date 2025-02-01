import { useGetConnectionHubs } from '@/hooks/queries/mypage/connection-hub';
import { useMyPageStore } from '@/store/mypageStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const useConnectionHub = (active: string) => {
  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const hubQuery = useGetConnectionHubs(
    ownerId,
    active.startsWith('내가') ? 'created' : 'applied'
  );

  useEffect(() => {
    hubQuery.refetch();
  }, [active]);

  return { ...hubQuery };
};

export default useConnectionHub;
