import { AuthAction, AuthState } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: '',
      userInfo: null,
      setAccessToken: (token: string) => {
        set({ accessToken: token, isLoggedIn: !!token });
        localStorage.setItem('@token', token);
      },
      login: (user: User, token: string) => {
        set({
          accessToken: token,
          isLoggedIn: true,
          userInfo: user,
        });
        sessionStorage.setItem('@token', token); // 테스트 하기 위해 sessionStorage로 변경함
      },
      logout: () => {
        set({
          accessToken: '',
          isLoggedIn: false,
          userInfo: null,
        });
        localStorage.removeItem('@token');
      },
      setUserRole: (userRole: number) => {
        const currentUserInfo = get().userInfo;
        if (currentUserInfo) {
          set({
            userInfo: { ...currentUserInfo, role_id: userRole },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        userInfo: state.userInfo,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
