import CallbackPage from '@/components/pages/CallbackPage';
import RolePage from '@/components/pages/RolePage';
import ChatPage from '@/components/pages/ChatPage';
import LoginPage from '@/components/pages/LoginPage';
import HomePage from '@/components/pages/HomePage';
import SettingsPage from '@/components/pages/SettingsPage';
import MainLayout from '@/layouts/MainLayout';
import ConnectionHubPage from '@/components/pages/ConnectionHubPage';
import MyPage from '@/components/pages/MyPage';
import SubLayout from '@/layouts/SubLayout';
import SearchPage from '@/components/pages/SearchPage';
import PadLoginPage from '@/components/pages/PadLoginPage';
import PadSignupPage from '@/components/pages/PadSignupPage';
import ConnetcionHubDetailPage from '@/components/pages/ConnetcionHubDetailPage';
import TestPage from '@/components/pages/TestPage';

const router = [
  {
    path: '/login',
    element: <LoginPage />,
  },
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
        path: '/connectionhubdetailpage',
        element: <ConnetcionHubDetailPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/chat',
    element: <SubLayout />,
    children: [
      {
        path: '/chat',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: '/login/pad',
    element: <PadLoginPage />,
  },
  {
    path: '/signup',
    element: <PadSignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: 'test',
    element: <TestPage />,
  },
];

export default router;
