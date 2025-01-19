import { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TabsStore<T> {
  tabs: T[];
  setTabs: (tabs: T[]) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export type TabType = ReactNode;

export const useTabsStore = create<TabsStore<TabType>>()(
  immer((set) => ({
    tabs: [],
    setTabs: (tabs) => set({ tabs }),

    activeTab: '',
    setActiveTab: (tab) => set({ activeTab: tab }),
  }))
);
