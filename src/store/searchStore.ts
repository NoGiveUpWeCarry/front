import { FetchChannelMessagesRequest } from '@/types/message.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchState {
  searchDirection: FetchChannelMessagesRequest['direction'];
  cursors: {
    prev: number | null;
    next: number | null;
  };
  searchMode: boolean;
  searchKeyword: string;
  searchCursor: number | null;
}

export interface SearchAction {
  setState: (state: Partial<SearchState>) => void;
}

type SearchStore = SearchState & SearchAction;

export const initialState: SearchState = {
  searchDirection: 'backward',
  cursors: {
    prev: null,
    next: null,
  },
  searchCursor: null,
  searchMode: false,
  searchKeyword: '',
};

export const useSearchStore = create<SearchStore>()(
  immer((set) => ({
    ...initialState,
    setState: (state) => {
      set(() => ({ ...state }));
    },
  }))
);
