import Messages from '@/components/organisms/chat/Messages';
import { ChatState } from '@/store/chatStore';

interface ChatMessagesProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  return currentChannelId ? (
    <Messages currentChannelId={currentChannelId} />
  ) : (
    <div className='grow px-[56px]'>채널을 선택해주세요</div>
  );
};

export default ChatMessages;

/*
1. 한 명이 연속으로 메세지를 여러개 보낸 경우 프로필 이미지는 하나만
2. 날짜는 '일' 기준으로 하나씩만 (해당 채팅방에서 그 날 첫 메시지일경우 그 날의 날짜 표시)

*/
