import HighlightedText from '@/components/atoms/HighlightedText';
import { ReceiveMessage } from '@/types/message.type';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

interface MessageBubbleProps {
  content: ReceiveMessage['content'];
  className?: string;
  messageId: number;
  isMyMessage: boolean;
  searchMessageId?: number | null;
}

const MessageBubble = ({
  content,
  className,
  messageId,
  isMyMessage,
  searchMessageId,
}: MessageBubbleProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const isSearchMessage = searchMessageId === messageId;

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
    });
  }, [isSearchMessage]);

  return (
    <div
      ref={isSearchMessage ? messageRef : undefined}
      className={cn(
        'px-[10px] py-[7px] text-caption1 w-fit rounded-[5px]',
        isMyMessage ? 'bg-[#EAFBFF]' : 'bg-[#ffdfe7]',
        className
      )}
    >
      {isSearchMessage ? <HighlightedText content={content} /> : content}
    </div>
  );
};

export default MessageBubble;
