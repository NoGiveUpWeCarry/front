import ChatHeader from '@/components/organisms/chat/ChatHeader';
import ChatInput from '@/components/molecules/chat/ChatInput';
import ChatBody from '@/components/organisms/chat/ChatBody';
import ChatMessages from '@/components/organisms/chat/ChatMessages';
import ChatMessagesWelcome from '@/components/molecules/chat/ChatMessagesWelcome';
import ChatHeaderInfo from '@/components/molecules/chat/ChatHeaderInfo';
import ChatHeaderWelcome from '@/components/molecules/chat/ChatHeaderWelcome';
import { useChatStore } from '@/store/chatStore';

const ChatRoom = () => {
  const currentChannelId = useChatStore((state) => state.currentChannelId);

  return (
    <>
      <ChatHeader currentChannelId={currentChannelId}>
        {currentChannelId ? (
          <ChatHeaderInfo currentChannelId={currentChannelId} />
        ) : (
          <ChatHeaderWelcome />
        )}
      </ChatHeader>
      <ChatBody>
        {currentChannelId ? (
          <ChatMessages currentChannelId={currentChannelId} />
        ) : (
          <ChatMessagesWelcome />
        )}
      </ChatBody>
      <ChatInput />
    </>
  );
};

export default ChatRoom;
