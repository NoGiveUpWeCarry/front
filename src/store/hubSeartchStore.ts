import {
  roleItems,
  RoleItemKeys,
  RoleItemValues,
} from '@/constants/hub/roleItems';
import {
  roleTagItemsKey,
  roleTagItemsValue,
} from '@/constants/hub/roleTagsItems';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface HubSearchState {
  sort: boolean;
  role: RoleItemValues | string;
  unit: roleTagItemsValue | string;
}

interface HubSearchAction {
  setSort: (sort: boolean) => void;
  setRole: (roleKey: RoleItemKeys | null) => void;
  setUnit: (unitKey: roleTagItemsKey | string | null) => void;
  reset: () => void;
}

const initialState: HubSearchState = {
  sort: true,
  role: '',
  unit: '',
};

const useHubSearchStore = create<HubSearchState & HubSearchAction>()(
  devtools(
    immer((set) => ({
      sort: true,
      role: '',
      unit: '',
      setSort: (sort) => {
        set((state) => {
          state.sort = sort;
        });
      },
      setRole: (roleKey) => {
        set((state) => {
          state.role = roleKey ? roleItems[roleKey] : '';
          state.unit = '';
        });
      },
      setUnit: (unitKey) => {
        set((state) => {
          state.unit = unitKey ?? '';
        });
      },
      reset: () => {
        set(() => ({
          ...initialState,
        }));
      },
    }))
  )
);

export default useHubSearchStore;
