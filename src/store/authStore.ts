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
            localStorage.setItem('@token', token);
          },
          login: async (user: User, token: string) => {
            await set({
              accessToken: token,
              isLoggedIn: true,
              userInfo: user,
            });
            console.log(
              'user_id in store: ' + useAuthStore.getState().userInfo?.user_id
            );
            localStorage.setItem('@token', token);
            // sessionStorage.setItem('@token', token); // 테스트 하기 위해 sessionStorage로 변경함
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
        })
      ),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          accessToken: state.accessToken,
          userInfo: state.userInfo,
        }),
        // storage: createJSONStorage(() => sessionStorage), // 유저 정보가 탭 별로 다르게 테스트 하기 위해 sessionStorage 사용
      }
    ),
    { name: 'AuthStore' }
  )
);

export default useAuthStore;
