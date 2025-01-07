import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  nickname: string;
  profile_url: string;
  auth_provider: string;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  userInfo: User | null;
}

interface AuthAction {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUserRole: (userRole: string) => void;
  setAccessToken: (token: string) => void;
}

const useAuth = create<AuthState & AuthAction>()(
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
        localStorage.setItem('@token', token);
      },
      logout: () => {
        set({
          accessToken: '',
          isLoggedIn: false,
          userInfo: null,
        });
        localStorage.removeItem('@token');
      },
      setUserRole: (userRole: string) => {
        const currentUserInfo = get().userInfo;
        if (currentUserInfo) {
          set({
            userInfo: { ...currentUserInfo, auth_provider: userRole },
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
    }
  )
);

window.addEventListener('storage', () => {
  useAuth.getState().setAccessToken(localStorage.getItem('@token') || '');
});

export default useAuth;
