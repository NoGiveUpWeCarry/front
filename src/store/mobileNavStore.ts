import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export interface MobileNavState {
  isNavShowed: boolean;
}

export interface MobileNavAction {
  setNavShow: () => void;
  setNavHide: () => void;
}

const useMobileNavStore = create(
  devtools(
    combine<MobileNavState, MobileNavAction>({ isNavShowed: true }, (set) => ({
      setNavShow: () => set({ isNavShowed: true }), // 네비게이션 보이기
      setNavHide: () => set({ isNavShowed: false }), // 네비게이션 숨기기
    }))
  )
);

export default useMobileNavStore;
