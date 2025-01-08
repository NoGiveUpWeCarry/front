import CallbackPage from '@/components/pages/CallbackPage';
import RolePage from '@/components/pages/RolePage';
import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import HomePage from '@/components/pages/HomePage';
import MainLayout from '@/layouts/MainLayout';
import ConnectionHubPage from '@/components/pages/ConnectionHubPage';
import MyPage from '@/components/pages/MyPage';

const router = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/connectionhub',
        element: <ConnectionHubPage />,
      },
    ],
  },
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
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
];

export default router;