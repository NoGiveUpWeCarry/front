import { TagItemValue, tagItem } from '@/constants/tagItem';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FeedSearchState {
  latest: boolean;
  tags: TagItemValue | 'null';
}

interface FeedSearchAction {
  setLatest: (latest: boolean) => void;
  setTags: (tagKey: keyof typeof tagItem | null) => void;
  reset: () => void;
}

const initialState: FeedSearchState & FeedSearchAction = {
  latest: true,
  tags: 'null',
  setLatest: () => {},
  setTags: () => {},
  reset: () => {},
};

const useFeedSearchStore = create<FeedSearchState & FeedSearchAction>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setLatest: (latest) => {
        set((state) => {
          state.latest = latest;
        });
      },
      setTags: (tagKey) => {
        set((state) => {
          state.tags = tagKey ? tagItem[tagKey] : 'null';
        });
      },
      reset: () => {
        set(() => ({
          ...initialState,
          setLatest: undefined,
          setTags: undefined,
          reset: undefined,
        }));
      },
    }))
  )
);

export default useFeedSearchStore;
