import { useMyPageStore } from '@/store/mypageStore';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const useApplyUI = () => {
  const { ownerId, isMyPage } = useMyPageStore(useShallow((state) => state));

  const [isEditing, setIsEditing] = useState(false);
  return {
    isEditing,
    setIsEditing,
    ownerId,
    isMyPage,
  };
};

export default useApplyUI;
