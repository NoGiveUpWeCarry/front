import { TagItemKey } from '@/constants/tagItem';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FeedState {
  title: string;
  tag: TagItemKey[];
  content: string;
}

interface FeedAction {
  setTitle: (title: string) => void;
  setTag: (tags: TagItemKey[]) => void;
  setContent: (content: string) => void;
  resetFeed: () => void;
}

const initialState: FeedState = {
  title: '',
  tag: [],
  content: '',
};

type FeedStore = FeedState & FeedAction;

const useFeedStore: () => FeedStore = create<FeedStore>()(
  devtools(
    immer<FeedStore>((set) => ({
      ...initialState,
      setTitle: (title) =>
        set((state) => {
          state.title = title;
        }),
      setTag: (tags) =>
        set((state) => {
          state.tag = tags;
        }),
      setContent: (content) =>
        set((state) => {
          state.content = content;
        }),
      resetFeed: () =>
        set((state) => {
          state.title = initialState.title;
          state.tag = initialState.tag;
          state.content = initialState.content;
        }),
    }))
  )
);

export default useFeedStore;
