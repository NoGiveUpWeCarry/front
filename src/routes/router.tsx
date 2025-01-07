import CallbackPage from '@/components/pages/CallbackPage';
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
    path: '/auth/:provider/callback',
    element: <CallbackPage />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
];

export default router;
