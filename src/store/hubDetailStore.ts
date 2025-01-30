import { create } from 'zustand';

interface Project {
  projectId: number;
  title: string;
  hubType: string;
  workType: string;
  status: string;
  detailRoles: string[];
  skills: string[];
  role: string;
  startDate: string;
  duration: string;
  content: string;
  createdAt: string;
  manager: {
    userId: number;
  };
}

interface ProjectStore {
  project: Project | null;
  isOwnConnectionHub: boolean;
  setProject: (project: Project | null, currentUserId: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  isOwnConnectionHub: false,
  setProject: (project, currentUserId) =>
    set({
      project,
      isOwnConnectionHub: project
        ? project.manager.userId === currentUserId
        : false,
    }),
}));
