import { useChat } from '@/hooks/chat/useChat';
import SubLayout from '@/layouts/SubLayout';

const ChatLayout = () => {
  useChat();
  return <SubLayout />;
};

export default ChatLayout;
