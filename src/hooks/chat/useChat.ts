import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '@/store/authStore';
import { useChannelId } from '@/hooks/chat/useChannelId';
import queryClient from '@/utils/queryClient';
import { io } from 'socket.io-client';
import { getSocketHandlers } from '@/socket/socketHandlers';
import {
  setupSocketEventHandlers,
  removeSocketEventHandlers,
} from '@/socket/socketUtils';

export const useChat = () => {
  const location = useLocation();
  const { currentChannelId } = useChannelId();

  const { userInfo, isLoggedIn } = useAuthStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      isLoggedIn: state.isLoggedIn,
    }))
  );
  const navigate = useNavigate();

  const { createChannel, createGroup, joinChannel, setState } = useChatStore(
    useShallow((state) => ({
      createChannel: state.createChannel,
      createGroup: state.createGroup,
      joinChannel: state.joinChannel,
      setState: state.setState,
    }))
  );

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요');
      navigate('/login');
      return;
    }
    const socketUrl = `${import.meta.env.VITE_BASE_SERVER_URL}/chat`;
    const userId = useAuthStore.getState().userInfo?.userId;

    const socket = io(socketUrl, {
      secure: true,
      rejectUnauthorized: false, // 로컬 자체 서명된 인증서의 경우 false 설정
      query: { userId },
    });
    setState({ socket });
    const socketHandlers = getSocketHandlers(socket);
    setupSocketEventHandlers(socket, socketHandlers);

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
      removeSocketEventHandlers(socket, socketHandlers);
      socket.disconnect();
      setState({
        socket: null,
        currentChannelId: null,
        messages: {},
        channels: {},
      });
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
