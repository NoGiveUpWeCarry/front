import ChatMessages from '@/components/organisms/chat/ChatMessages';
import ChatHeader from '@/components/organisms/chat/ChatHeader';
import { useChannel } from '@/hooks/useChannel';
import { useChat } from '@/hooks/useChat';

const ChatRoom = () => {
  const { channel, currentChannelMessages } = useChannel();
  useChat();

  return (
    <>
      <ChatHeader channel={channel} />
      <ChatMessages messages={currentChannelMessages} />
    </>
  );
};

export default ChatRoom;
