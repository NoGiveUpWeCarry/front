import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SearchTabsStore {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useSearchTabsStore = create<SearchTabsStore>()(
  immer((set) => ({
    tabs: ['피드', '프로젝트'],

    activeTab: '피드',
    setActiveTab: (tab) => set({ activeTab: tab }),
  }))
);
