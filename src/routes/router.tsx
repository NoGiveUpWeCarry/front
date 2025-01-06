import GoogleCallbackPage from '@/components/pages/GoogleCallbackPage';
import LoginPage from '@/components/pages/LoginPage';
import MainPage from '@/components/pages/MainPage';
import RolePage from '@/components/pages/RolePage';

const router = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/roleselect',
    element: <RolePage />,
  },
  {
    path: '/auth/google/callback',
    element: <GoogleCallbackPage />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
];

export default router;
