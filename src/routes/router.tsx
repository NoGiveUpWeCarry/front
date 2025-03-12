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
import FeedDetailPage from '@/components/pages/FeedDetailPage';
import HubLayout from '@/layouts/HubLayout';
import ChannelSelectPage from '@/components/pages/ChannelSelectPage';
import ChatLayout from '@/layouts/ChatLayout';

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
        path: '/:nickname',
        element: <MyPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/feed/:id',
        element: <FeedDetailPage />,
      },
    ],
  },
  {
    path: '/',
    element: <HubLayout />,
    children: [
      {
        path: '/projects',
        element: <ConnectionHubPage />,
      },
      {
        path: '/projects/:projectId',
        element: <ConnetcionHubDetailPage />,
      },
    ],
  },
  {
    path: '/chat',
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <ChannelSelectPage />,
      },
      {
        path: '/chat/channels/:channelId',
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
];

export default router;
