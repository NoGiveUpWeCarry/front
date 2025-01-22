import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { combine } from 'zustand/middleware';
import { AuthAction, AuthState } from '@/types/auth.type';
import { User } from '@/types/user.type';

const useAuthStore = create(
  devtools(
    persist(
      combine<AuthState, AuthAction>(
        {
          isLoggedIn: false,
          accessToken: '',
          userInfo: null,
        },
        (set, get) => ({
          setAccessToken: (token: string) => {
            set({ accessToken: token, isLoggedIn: !!token });
            // localStorage.setItem('@token', token);
            sessionStorage.setItem('@token', token);
          },
          login: (user: User, token: string) => {
            console.log('zustand login 호출됨.');
            set({
              isLoggedIn: true,
              accessToken: token,
              userInfo: user,
            });
            // localStorage.setItem('@token', token);
            sessionStorage.setItem('@token', token); // 테스트 하기 위해 sessionStorage로 변경함
          },
          logout: () => {
            set({
              accessToken: '',
              isLoggedIn: false,
              userInfo: null,
            });
            // localStorage.removeItem('@token');
            sessionStorage.removeItem('@token');
          },
          setUserRole: (userRole: number) => {
            const currentUserInfo = get().userInfo;
            if (currentUserInfo) {
              set({
                userInfo: { ...currentUserInfo, roleId: userRole },
              });
            }
          },
        })
      ),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          accessToken: state.accessToken,
          userInfo: state.userInfo,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: 'AuthStore' }
  )
);

export default useAuthStore;
