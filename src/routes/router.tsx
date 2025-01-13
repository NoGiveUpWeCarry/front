import CallbackPage from '@/components/pages/CallbackPage';
import RolePage from '@/components/pages/RolePage';
import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import HomePage from '@/components/pages/HomePage';
import SettingsPage from '@/components/pages/SettingsPage';
import MainLayout from '@/layouts/MainLayout';
import ConnectionHubPage from '@/components/pages/ConnectionHubPage';
import MyPage from '@/components/pages/MyPage';
import SearchPage from '@/components/pages/SearchPage';

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
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/connectionhub',
        element: <ConnectionHubPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
];

export default router;
