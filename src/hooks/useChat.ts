import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/store/authStore';

export const useChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createChannel, connectSocket, disconnectSocket } = useChatStore(
    useShallow((state) => ({
      createChannel: state.createChannel,
      connectSocket: state.connectSocket,
      disconnectSocket: state.disconnectSocket,
    }))
  );

  useEffect(() => {
    const userInfo = useAuthStore.getState().userInfo;
    if (!userInfo) {
      alert('로그인을 해주세요');
      navigate('/login');
      return;
    }

    connectSocket();
    // 메시지 버튼을 눌러서 넘어온 경우
    if (location.state?.targetUserId) {
      const userId1 = userInfo.user_id;
      const userId2 = location.state.targetUserId;
      createChannel(userId1, userId2);
    }
    return () => disconnectSocket();
  }, []);
};
