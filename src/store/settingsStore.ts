import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SettingsFormData {
  profileUrl: File | string | null;
  introduce: string;
  jobDetail: string;
  skills: string[];
  links: string[];
  nickname: string;
  status: string;
}

interface Store {
  settingsForm: SettingsFormData;
  setSingleSettingsForm: (name: string, value: string | File | null) => void;
  setSettingsForm: (value: SettingsFormData) => void;
  resetSettingsForm: () => void;
}

const initialStore = {
  profileUrl: '',
  introduce: '',
  jobDetail: '',
  skills: [],
  links: [],
  nickname: '',
  status: '',
};

export const useSettingsStore = create<Store>()(
  immer((set) => ({
    settingsForm: initialStore,
    setSingleSettingsForm: (name, value) =>
      set((state) => ({
        settingsForm: { ...state.settingsForm, [name]: value },
      })),
    setSettingsForm: (value) => set({ settingsForm: value }),
    resetSettingsForm: () => set({ settingsForm: initialStore }),
  }))
);
