import ChatMessages from '@/components/organisms/chat/ChatMessages';
import ChatHeader from '@/components/organisms/chat/ChatHeader';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';

const ChatRoom = () => {
  const { connectSocket, joinChannel, currentChannelId, disconnectSocket } =
    useChatStore(
      useShallow((state) => ({
        connectSocket: state.connectSocket,
        joinChannel: state.joinChannel,
        currentChannelId: state.currentChannelId,
        disconnectSocket: state.disconnectSocket,
      }))
    );

  useEffect(() => {
    connectSocket();
    joinChannel(currentChannelId);
    return () => disconnectSocket();
  }, []);
  return (
    <>
      <ChatHeader />
      <ChatMessages />
    </>
  );
};

export default ChatRoom;
