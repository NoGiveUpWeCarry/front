import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchState {
  searchMode: boolean;
  searchKeyword: string;
  searchDirection: 'backward' | 'forward';
  searchCursor: number | null;
}

export interface SearchAction {
  setState: (state: Partial<SearchState>) => void;
}

type SearchStore = SearchState & SearchAction;

export const initialState: SearchState = {
  searchMode: false,
  searchKeyword: '',
  searchDirection: 'backward',
  searchCursor: null,
};

export const useSearchStore = create<SearchStore>()(
  immer((set) => ({
    ...initialState,
    setState: (state) => {
      set(() => ({ ...state }));
    },
  }))
);
