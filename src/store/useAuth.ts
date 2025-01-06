import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  userId: string;
  userRole: string;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  userInfo: UserInfo | null;
}

interface AuthAction {
  login: (userId: string, userRole: string, token: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

const useAuth = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: '',
      userInfo: null,
      setAccessToken: (token: string) => {
        set({ accessToken: token, isLoggedIn: !!token });
        localStorage.setItem('@token', token);
      },
      login: (userId: string, userRole: string, token: string) => {
        set({
          accessToken: token,
          isLoggedIn: true,
          userInfo: { userId, userRole },
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
