import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Follower {
  id: number;
  name: string;
  url: string;
  profileUrl: string;
}

interface FollowsStore {
  follows: Follower[];
  setFollows: (follows: Follower[]) => void;
}

export const useFollowsStore = create<FollowsStore>()(
  immer((set) => ({
    follows: [],
    setFollows: (follows) => set({ follows }),
  }))
);
