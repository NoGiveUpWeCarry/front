import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SearchModalStore {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;

  keyword: string;
  setKeyword: (value: string) => void;
}

export const useSearchModal = create<SearchModalStore>()(
  immer((set) => ({
    isModalOpen: false,
    setIsModalOpen: (value) => set({ isModalOpen: value }),

    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),

    keyword: '',
    setKeyword: (value) => set({ keyword: value }),
  }))
);
