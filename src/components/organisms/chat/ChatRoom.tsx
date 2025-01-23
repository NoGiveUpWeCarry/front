import ChatHeader from '@/components/organisms/chat/ChatHeader';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';
import ChatInput from '@/components/molecules/chat/ChatInput';
import ChatBody from '@/components/organisms/chat/ChatBody';

const ChatRoom = () => {
  const { currentChannelId } = useChatStore(
    useShallow((state) => ({
      currentChannelId: state.currentChannelId,
    }))
  );

  return (
    <>
      <ChatHeader currentChannelId={currentChannelId} />
      <ChatBody currentChannelId={currentChannelId} />
      <ChatInput currentChannelId={currentChannelId} />
    </>
  );
};

export default ChatRoom;
