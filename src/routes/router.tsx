import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import MainPage from '@/components/pages/MainPage';
import MyPage from '@/components/pages/MyPage';

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
  {
    path: '/mypage',
    element: <MyPage />,
  },
];

export default router;
