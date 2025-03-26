import { Outlet, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';

const RootLayout = () => {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentChannelId) {
      navigate(`/chat/channels/${currentChannelId}`);
    }
  }, [currentChannelId, navigate]);

  return <Outlet />;
};

export default RootLayout;
