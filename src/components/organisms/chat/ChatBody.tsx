import ChatMessages from '@/components/organisms/chat/ChatMessages';
import { ChatState } from '@/store/chatStore';
interface ChatBodyProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatBody = ({ currentChannelId }: ChatBodyProps) => {
  return currentChannelId ? (
    <ChatMessages currentChannelId={currentChannelId} />
  ) : (
    <div className='grow px-[56px]'>채널을 선택해주세요</div>
  );
};

export default ChatBody;
