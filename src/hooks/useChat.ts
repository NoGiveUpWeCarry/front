import { useLocation } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/store/authStore';
import { useAlert } from '@/hooks/useAlert';

export const useChat = () => {
  const location = useLocation();
  const userInfo = useAuthStore((state) => state.userInfo);
  const { loginAlert } = useAlert();

  const { createChannel, connectSocket, disconnectSocket } = useChatStore(
    useShallow((state) => ({
      createChannel: state.createChannel,
      connectSocket: state.connectSocket,
      disconnectSocket: state.disconnectSocket,
    }))
  );

  useEffect(() => {
    if (!userInfo) {
      loginAlert();
      return;
    }

    connectSocket();
    // 메시지 버튼을 눌러서 넘어온 경우
    if (location.state?.targetUserId) {
      const userId1 = userInfo.userId;
      const userId2 = location.state.targetUserId;
      createChannel(userId1, userId2);
    }
    return () => disconnectSocket();
  }, []);
};
