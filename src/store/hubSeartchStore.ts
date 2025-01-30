import { roleItems, roleItemsValue } from '@/constants/hub/roleItems';
import { roleTagItems, roleTagItemsValue } from '@/constants/hub/roleTagsItems';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface HubSearchState {
  sort: boolean;
  role: roleItemsValue | 'null';
  unit: roleTagItemsValue | 'null';
}

interface HubSearchAction {
  setSort: (sort: boolean) => void;
  setRole: (roleKey: keyof typeof roleItems | null) => void;
  setUnit: (unitKey: keyof typeof roleTagItems | null) => void;
  reset: () => void;
}

const initialState: HubSearchState & HubSearchAction = {
  sort: true,
  role: 'null',
  unit: 'null',
  setSort: () => {},
  setRole: () => {},
  setUnit: () => {},
  reset: () => {},
};

const useHubSearchStore = create<HubSearchState & HubSearchAction>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setSort: (sort) => {
        set((state) => {
          state.sort = sort;
        });
      },
      setRole: (roleKey) => {
        set((state) => {
          state.role = roleKey ? roleItems[roleKey] : 'null';
        });
      },
      setUnit: (unitKey) => {
        set((state) => {
          state.unit = unitKey ? roleTagItems[unitKey] : 'null';
        });
      },
      reset: () => {
        set(() => ({
          ...initialState,
          setSort: undefined,
          setRole: undefined,
          setUnit: undefined,
          reset: undefined,
        }));
      },
    }))
  )
);

export default useHubSearchStore;
