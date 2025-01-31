import { useModal } from '@/hooks/useModal';
import { useMyPageStore } from '@/store/mypageStore';
import { useMyPageTabsStore } from '@/store/myTabsStore';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const useIntroductionUI = () => {
  const { isOpen: isAddProjectOpen, openModal, closeModal } = useModal();

  const [isFollowersOpen, setIsFollowersOpen] = useState<
    'followers' | 'following' | null
  >(null);
  const [isForUpdate, setIsForUpdate] = useState(false);

  const { setActiveTab } = useMyPageTabsStore(useShallow((state) => state));
  const { isMyPage, role } = useMyPageStore(useShallow((state) => state));

  const isMusicWork = (work: any): work is { musicUrl: string } => {
    return 'musicUrl' in work;
  };

  return {
    addProjectModal: {
      isOpen: isAddProjectOpen,
      open: openModal,
      close: closeModal,
    },
    followersModal: {
      isOpen: isFollowersOpen,
      close: () => setIsFollowersOpen(null),
      set: (value: 'followers' | 'following') => setIsFollowersOpen(value),
    },
    isForUpdate,
    setIsForUpdate,
    tabsStore: { setActiveTab },
    mypageStore: { isMyPage, role },
    isMusicWorkValid: isMusicWork,
  };
};

export default useIntroductionUI;
