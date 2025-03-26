import ChatMessagesWelcome from '@/components/molecules/chat/ChatMessagesWelcome';
import ChatMessages from '@/components/organisms/chat/ChatMessages';
import { Channel } from '@/types/channel.type';

interface ChatBodyProps {
  currentChannelId: Channel['channelId'] | null;
}

const ChatBody = ({ currentChannelId }: ChatBodyProps) => {
  if (!currentChannelId) return <ChatMessagesWelcome />;
  return <ChatMessages currentChannelId={currentChannelId} />;
};
export default ChatBody;
