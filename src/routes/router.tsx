import { lazy } from 'react';
import RootLayout from '@/layouts/RootLayout';
import MainLayout from '@/layouts/MainLayout';
import HubLayout from '@/layouts/HubLayout';
import ChatLayout from '@/layouts/ChatLayout';

// Lazy load
const CallbackPage = lazy(() => import('@/components/pages/CallbackPage'));
const RolePage = lazy(() => import('@/components/pages/RolePage'));
const ChatPage = lazy(() => import('@/components/pages/ChatPage'));
const LoginPage = lazy(() => import('@/components/pages/LoginPage'));
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const SettingsPage = lazy(() => import('@/components/pages/SettingsPage'));
const MyPage = lazy(() => import('@/components/pages/MyPage'));
const SearchPage = lazy(() => import('@/components/pages/SearchPage'));
const PadLoginPage = lazy(() => import('@/components/pages/PadLoginPage'));
const PadSignupPage = lazy(() => import('@/components/pages/PadSignupPage'));
const ConnectionHubPage = lazy(
  () => import('@/components/pages/ConnectionHubPage')
);
const ConnectionHubDetailPage = lazy(
  () => import('@/components/pages/ConnetcionHubDetailPage')
);
const FeedDetailPage = lazy(() => import('@/components/pages/FeedDetailPage'));
const ChannelSelectPage = lazy(
  () => import('@/components/pages/ChannelSelectPage')
);

const mainRoutes = {
  element: <MainLayout />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/roleselect', element: <RolePage /> },
    { path: '/auth/:provider/callback', element: <CallbackPage /> },
    { path: '/:nickname', element: <MyPage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/search', element: <SearchPage /> },
    { path: '/feed/:id', element: <FeedDetailPage /> },
  ],
};

const hubRoutes = {
  element: <HubLayout />,
  children: [
    { path: '/projects', element: <ConnectionHubPage /> },
    { path: '/projects/:projectId', element: <ConnectionHubDetailPage /> },
  ],
};

const chatRoutes = {
  path: '/chat',
  element: <ChatLayout />,
  children: [
    { index: true, element: <ChannelSelectPage /> },
    { path: 'channels/:channelId', element: <ChatPage /> },
  ],
};

const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/login/pad', element: <PadLoginPage /> },
  { path: '/signup', element: <PadSignupPage /> },
];

const router = [
  {
    element: <RootLayout />,
    children: [mainRoutes, hubRoutes, chatRoutes, ...authRoutes],
  },
];

export default router;
