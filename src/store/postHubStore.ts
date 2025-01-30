import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface HubState {
  projectId?: number | null;
  title: string; // 프로젝트 명
  content: string; // 프로젝트 설명
  role: string; // P, A, D 중 하나
  hubType: 'PROJECT' | 'OUTSOURCING'; // 프로젝트, 외주
  startDate: string; // 시작 날짜
  duration: string; // 작업 기간
  durationType: string; // 기간 단위 (개월, 주 등)
  workType: 'ONLINE' | 'OFFLINE';
  recruiting: boolean; // 모집 중인지 여부
  skills: string[]; // React, TypeScript 등
  detailRoles: string[]; // Frontend Developer 등 role의 상세 역할
}

interface HubAction {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRole: (role: string) => void;
  setHubType: (hubType: 'PROJECT' | 'OUTSOURCING') => void;
  setStartDate: (startDate: string) => void;
  setDuration: (duration: string) => void;
  setDurationType: (durationType: string) => void;
  setWorkType: (workType: 'ONLINE' | 'OFFLINE') => void;
  setRecruiting: (recruiting: boolean) => void;
  setSkills: (skills: string[]) => void;
  setDetailRoles: (detailRoles: string[]) => void;
  resetHub: () => void;
  loadHub: (project: HubState) => void;
}

const initialState: HubState = {
  projectId: null,
  title: '',
  content: '',
  role: '',
  hubType: 'PROJECT',
  startDate: '',
  duration: '',
  durationType: '',
  workType: 'ONLINE',
  recruiting: true,
  skills: [],
  detailRoles: [],
};

type HubStore = HubState & HubAction;

const useHubStore = create<HubStore>()(
  devtools(
    immer<HubStore>((set) => ({
      ...initialState,
      setTitle: (title: string) =>
        set((state) => {
          state.title = title;
        }),
      setContent: (content: string) =>
        set((state) => {
          state.content = content;
        }),
      setRole: (role: string) =>
        set((state) => {
          state.role = role;
        }),
      setHubType: (hubType: 'PROJECT' | 'OUTSOURCING') =>
        set((state) => {
          state.hubType = hubType;
        }),
      setStartDate: (startDate: string) =>
        set((state) => {
          state.startDate = startDate;
        }),
      setDuration: (duration: string) =>
        set((state) => {
          state.duration = duration;
        }),
      setDurationType: (durationType: string) =>
        set((state) => {
          state.durationType = durationType;
        }),
      setWorkType: (workType: 'ONLINE' | 'OFFLINE') =>
        set((state) => {
          state.workType = workType;
        }),
      setRecruiting: (recruiting: boolean) =>
        set((state) => {
          state.recruiting = recruiting;
        }),
      setSkills: (skills: string[]) =>
        set((state) => {
          state.skills = skills;
        }),
      setDetailRoles: (detailRoles: string[]) =>
        set((state) => {
          state.detailRoles = detailRoles;
        }),
      resetHub: () =>
        set(() => ({
          ...initialState,
        })),
      loadHub: (project: HubState) => set(() => ({ ...project })),
    }))
  )
);

export default useHubStore;
