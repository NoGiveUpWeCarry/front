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
            set({
              accessToken: token,
              isLoggedIn: true,
              userInfo: user, // 로그인 카멜케이스로 변경되기 전까진 아래꺼로 사용
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
        storage: createJSONStorage(() => sessionStorage), // 유저 정보가 탭 별로 다르게 테스트 하기 위해 sessionStorage 사용
      }
    ),
    { name: 'AuthStore' }
  )
);

export default useAuthStore;
