import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MyPageTabsStore {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useMyPageTabsStore = create<MyPageTabsStore>()(
  immer((set) => ({
    tabs: ['소개', '지원서', '피드', '커넥션 허브'],

    activeTab: '소개',
    setActiveTab: (tab) => set({ activeTab: tab }),
  }))
);
