import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type TiptapState = {
  content: string;
};

export type TiptapAction = {
  setContent: (content: string) => void;
  reset: () => void;
};

const initialState: TiptapState = {
  content: '',
};

const useTiptapStore = create(
  combine<TiptapState, TiptapAction>(initialState, (set) => ({
    setContent: (content: string) => set({ content }),
    reset: () => set(initialState),
  }))
);

export default useTiptapStore;
