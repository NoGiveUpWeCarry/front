import CallbackPage from '@/components/pages/CallbackPage';
import RolePage from '@/components/pages/RolePage';
import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import MyPage from '@/components/pages/MyPage';
import HomePage from '@/components/pages/HomePage';
import Layouts from '@/layouts/Layouts';

const router = [
  {
    path: '/',
    element: (
      <Layouts>
        <HomePage />
      </Layouts>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
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