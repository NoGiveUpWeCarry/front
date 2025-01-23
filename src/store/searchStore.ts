import {
  FetchChannelMessagesRequest,
  SearchChannelMessagesResponse,
} from '@/types/message.type';
import {
  InfiniteQueryObserverResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchState {
  lastSearchKeyword: string;
  direction: FetchChannelMessagesRequest['direction'];
  cursors: SearchChannelMessagesResponse['cursors'];
  mode: 'search' | 'scroll';
}

type InfiniteQueryDefaults<TData = unknown, TError = Error> = Partial<
  Pick<UseInfiniteQueryResult<TData, TError>, 'isFetching' | 'fetchNextPage'>
>;

export interface SearchAction {
  setState: (state: InfiniteQueryDefaults & Partial<SearchState>) => void;
}

type SearchStore = SearchState & SearchAction & InfiniteQueryDefaults;

const createInfiniteQueryDefaults = <TData, TError>(): InfiniteQueryDefaults<
  TData,
  TError
> => ({
  fetchNextPage: async () => ({}) as InfiniteQueryObserverResult<TData, TError>,
});

export const useSearchStore = create<SearchStore>()(
  immer((set) => ({
    lastSearchKeyword: '',
    direction: 'backward',
    cursors: {
      search: null,
      prev: null,
      next: null,
    },
    mode: 'scroll',
    ...createInfiniteQueryDefaults(),
    setState: (state) => {
      set(() => ({ ...state }));
    },
  }))
);
