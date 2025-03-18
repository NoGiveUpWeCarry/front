import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/store/authStore';
import { useChannelId } from '@/hooks/chat/useChannelId';
import queryClient from '@/utils/queryClient';

export const useChat = () => {
  const location = useLocation();
  const { currentChannelId } = useChannelId();

  const { joinChannel, setState } = useChatStore(
    useShallow((state) => ({
      joinChannel: state.joinChannel,
      setState: state.setState,
    }))
  );

  const { userInfo, isLoggedIn } = useAuthStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      isLoggedIn: state.isLoggedIn,
    }))
  );
  const navigate = useNavigate();

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
    if (!isLoggedIn) {
      alert('로그인을 해주세요');
      navigate('/login');
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
    }

    return () => {
      disconnectSocket();
      window.history.replaceState({}, '');
    };
  }, []);

  useEffect(() => {
    if (currentChannelId) {
      joinChannel(userInfo.userId, currentChannelId);
      queryClient.invalidateQueries({
        queryKey: ['messages', { channelId: currentChannelId }],
      });
    }
    setState({ currentChannelId });
    return () => {
      setState({ currentChannelId: null });
    };
  }, [currentChannelId]);
};
