import { ReceiveMessage } from '@/types/message.type';
import LoadingDots from '@/components/molecules/LoadingDots';
import Messages from '@/components/organisms/chat/Messages';

interface MessageListProps {
  messages: ReceiveMessage[];
  searchMessageId?: number | null;
  loadNextRef: (node?: Element | null) => void;
  showNextRef: boolean;
  isFetchingNextPage: boolean;
}

export const MessageList = ({
  messages,
  searchMessageId,
  loadNextRef,
  showNextRef,
  isFetchingNextPage,
}: MessageListProps) => {
  if (!messages.length) return null;

  return (
    <>
      {showNextRef && <div ref={loadNextRef} />}
      {isFetchingNextPage && <LoadingDots />}
      <Messages messages={messages} searchMessageId={searchMessageId} />
    </>
  );
};
