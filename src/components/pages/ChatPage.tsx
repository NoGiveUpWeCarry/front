import ChatTemplate from '@/components/templates/ChatTemplate';
import { useChat } from '@/hooks/useChat';

const ChatPage = () => {
  useChat();
  return <ChatTemplate />;
};

export default ChatPage;
