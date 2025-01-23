import HighlightedText from '@/components/atoms/HighlightedText';
import { useSearchStore } from '@/store/searchStore';
import { ReceiveMessage } from '@/types/message.type';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

interface MessageBubbleProps {
  content: ReceiveMessage['content'];
  className?: string;
  messageId: number;
}

const MessageBubble = ({
  content,
  className,
  messageId,
}: MessageBubbleProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const { searchCursor } = useSearchStore(
    useShallow((state) => ({
      searchCursor: state.cursors.search,
    }))
  );

  const isSearchMessage = searchCursor === messageId;

  useEffect(() => {
    const message = messageRef.current;
    if (isSearchMessage && message) {
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSearchMessage]);

  return (
    <div
      ref={messageRef}
      className={cn(
        'bg-[#EAFBFF] px-[10px] py-[7px] text-caption1 w-fit rounded-[5px]',
        className
      )}
    >
      {isSearchMessage ? <HighlightedText content={content} /> : content}
    </div>
  );
};

export default MessageBubble;
