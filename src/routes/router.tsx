import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import MainPage from '@/components/pages/MainPage';

const router = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
];

export default router;
