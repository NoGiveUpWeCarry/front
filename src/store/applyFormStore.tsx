import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ApplyFormData = {
  title: string;
  category: string;
  link: string;
  content: string;
};

interface ApplyFormStore {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

  inputs: ApplyFormData;
  onSetInputs: (name: string, value: string) => void;
  resetInputs: () => void;
}

const initialInputs = {
  title: '',
  category: '',
  link: '',
  content: '',
};

export const useApplyFormStore = create<ApplyFormStore>()(
  immer((set) => ({
    isEditing: false,
    setIsEditing: (isEditing) => set({ isEditing }),

    inputs: initialInputs,
    onSetInputs: (name, value) =>
      set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
    resetInputs: () => set({ inputs: initialInputs }),
  }))
);
