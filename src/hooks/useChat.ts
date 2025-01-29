import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/store/authStore';
import { useAlert } from '@/hooks/useAlert';
import { useChannelParam } from '@/hooks/useChannelParam';

export const useChat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo = useAuthStore((state) => state.userInfo);
  const { loginAlert } = useAlert();

  const { currentChannelId } = useChannelParam();
  const joinChannel = useChatStore((state) => state.joinChannel);

  const {
    createChannel,
    connectSocket,
    disconnectSocket,
    createGroup,
    navigatePath,
  } = useChatStore(
    useShallow((state) => ({
      createChannel: state.createChannel,
      connectSocket: state.connectSocket,
      disconnectSocket: state.disconnectSocket,
      createGroup: state.createGroup,
      navigatePath: state.navigatePath,
    }))
  );

  useEffect(() => {
    if (!userInfo) {
      loginAlert();
      return;
    }
    connectSocket();

    if (location.state?.targetUserId) {
      // 개인 채팅방 생성으로 넘어온 경우
      const userId1 = userInfo.userId;
      const userId2 = location.state.targetUserId;
      createChannel(userId1, userId2);
    } else if (location.state?.userIds && location.state?.title) {
      // 그룹 채팅방 생성으로 넘어온 경우
      const userIds = location.state.userIds;
      const title = location.state.title;
      createGroup(userIds, title);
    } else if (userInfo.userId && currentChannelId) {
      joinChannel(userInfo.userId, currentChannelId);
    }
    return () => {
      disconnectSocket();
      window.history.replaceState({}, '');
    };
  }, []);

  useEffect(() => {
    if (navigatePath === null) return;
    navigate(navigatePath);
  }, [navigatePath]);
};
