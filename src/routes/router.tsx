import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import HomePage from '@/components/pages/HomePage';
import Layouts from '@/layouts/Layouts';
import SettingsPage from '@/components/pages/SettingsPage';

const router = [
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/chat',
        element: <ChatPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
];

export default router;
