import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
}

interface SidebarAction {
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState & SidebarAction>()(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);
