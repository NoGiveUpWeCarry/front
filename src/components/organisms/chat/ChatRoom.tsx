import ChatMessages from '@/components/organisms/chat/ChatMessages';
import ChatHeader from '@/components/organisms/chat/ChatHeader';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';
import ChatInput from '@/components/molecules/chat/ChatInput';

const ChatRoom = () => {
  const { currentChannelId } = useChatStore(
    useShallow((state) => ({
      currentChannelId: state.currentChannelId,
    }))
  );

  return (
    <>
      <ChatHeader currentChannelId={currentChannelId} />
      <ChatMessages currentChannelId={currentChannelId} />
      <ChatInput currentChannelId={currentChannelId} />
    </>
  );
};

export default ChatRoom;
