import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface AddProjectFormData {
  github: string;
  web: string;
  ios: string;
  android: string;
  title: string;
  description: string;
  imageUrl: File | null;
}

interface AddProjectFormStore {
  formData: AddProjectFormData;
  setFormData: (name: string, value: string | File | null) => void;
  resetFormData: () => void;
}

const initialStore = {
  github: '',
  web: '',
  ios: '',
  android: '',
  title: '',
  description: '',
  imageUrl: null,
};

export const useAddProjectFormStore = create<AddProjectFormStore>()(
  immer((set) => ({
    formData: initialStore,
    setFormData: (name, value) =>
      set((state) => ({ formData: { ...state.formData, [name]: value } })),
    resetFormData: () => set({ formData: initialStore }),
  }))
);
