import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MyPageStore {
  isMyPage: boolean;
  setIsMyPage: (value: boolean) => void;
  role: string;
  setRole: (value: string) => void;
  ownerId: number;
  setOwnerId: (value: number) => void;
  nickname: string;
  setNickname: (value: string) => void;
}

export const useMyPageStore = create<MyPageStore>()(
  immer((set) => ({
    isMyPage: false,
    setIsMyPage: (value) => set({ isMyPage: value }),

    role: '',
    setRole: (value) => set({ role: value }),

    ownerId: 0,
    setOwnerId: (value) => set({ ownerId: value }),

    nickname: '',
    setNickname: (value) => set({ nickname: value }),
  }))
);
