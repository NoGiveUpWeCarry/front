import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ApplyFormData = {
  resumeId: number;
  title: string;
  job: string;
  link: string;
  skills: string[];
  detail: string;
};

interface ApplyFormStore {
  applyForm: ApplyFormData;
  setSingleApplyForm: (name: string, value: string) => void;
  setApplyForm: (value: ApplyFormData) => void;
  resetApplyForm: () => void;
}

const initialInputs = {
  resumeId: -1,
  title: '',
  job: '',
  link: '',
  detail: '',
  skills: [],
};

export const useApplyFormStore = create<ApplyFormStore>()(
  immer((set) => ({
    applyForm: initialInputs,
    setSingleApplyForm: (name, value) =>
      set((state) => ({ applyForm: { ...state.applyForm, [name]: value } })),
    setApplyForm: (value) => set({ applyForm: value }),
    resetApplyForm: () => set({ applyForm: initialInputs }),
  }))
);
