import { FollowUsers } from '@/types/mypage.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FollowsStore {
  follows: FollowUsers[];
  setFollows: (follows: FollowUsers[]) => void;
}

export const useFollowsStore = create<FollowsStore>()(
  immer((set) => ({
    follows: [],
    setFollows: (follows) => set({ follows }),
  }))
);
