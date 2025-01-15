import Messages from '@/components/organisms/chat/Messages';
import { useMessages } from '@/hooks/useMessages';
import { ChatState } from '@/store/chatStore';
import clsx from 'clsx';

interface ChatMessagesProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const { messages } = useMessages(currentChannelId);
  return (
    <div
      className={clsx(
        'grow pl-[56px] pr-[44px] flex flex-col scrollbar overflow-hidden hover:overflow-y-scroll mr-[12px] hover:mr-0'
      )}
    >
      {currentChannelId ? (
        <>
          <Messages
            messages={
              messages[currentChannelId] ? messages[currentChannelId] : []
            }
          />
        </>
      ) : (
        <>
          <div>채널을 선택해주세요</div>
        </>
      )}
    </div>
  );
};

export default ChatMessages;

/*
1. 한 명이 연속으로 메세지를 여러개 보낸 경우 프로필 이미지는 하나만
2. 날짜는 '일' 기준으로 하나씩만 (해당 채팅방에서 그 날 첫 메시지일경우 그 날의 날짜 표시)

*/
