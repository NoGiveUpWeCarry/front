import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface AddProjectFormData {
  id: number;
  title: string;
  description: string;
  image: File | string | null;
  github: string;
  web: string;
  ios: string;
  android: string;
}

interface AddProjectFormStore {
  projectForm: AddProjectFormData;
  setSingleProjectForm: (name: string, value: string | File | null) => void;
  setProjectForm: (value: AddProjectFormData) => void;
  resetProjectForm: () => void;
}

const initialStore = {
  id: -1,
  title: '',
  description: '',
  image: null,
  github: '',
  web: '',
  ios: '',
  android: '',
};

export const useAddProjectFormStore = create<AddProjectFormStore>()(
  immer((set) => ({
    projectForm: initialStore,
    setSingleProjectForm: (name, value) =>
      set((state) => ({
        projectForm: { ...state.projectForm, [name]: value },
      })),
    setProjectForm: (value) => set({ projectForm: value }),
    resetProjectForm: () => set({ projectForm: initialStore }),
  }))
);
