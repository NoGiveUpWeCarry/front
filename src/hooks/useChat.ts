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

  const { createChannel, connectSocket, disconnectSocket, createGroup } =
    useChatStore(
      useShallow((state) => ({
        createChannel: state.createChannel,
        connectSocket: state.connectSocket,
        disconnectSocket: state.disconnectSocket,
        createGroup: state.createGroup,
      }))
    );

  useEffect(() => {
    if (!userInfo) {
      loginAlert();
      return;
    }

    connectSocket();
    // 개인 채팅방 생성으로 넘어온 경우
    if (location.state?.targetUserId) {
      const userId1 = userInfo.userId;
      const userId2 = location.state.targetUserId;
      createChannel(userId1, userId2);
    } else if (location.state?.userIds && location.state?.title) {
      const userIds = location.state.userIds;
      const title = location.state.title;
      createGroup(userIds, title);
    }
    return () => {
      disconnectSocket();
      window.history.replaceState({}, '');
    };
  }, []);
};
