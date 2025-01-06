import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
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
    path: '/chat',
    element: <ChatPage />,
  },
];

export default router;
