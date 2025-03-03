import HighlightedText from '@/components/atoms/HighlightedText';
import { LIMIT } from '@/constants/limit';
import { useChannelId } from '@/hooks/chat/useChannelId';
import { useSearchStore } from '@/store/searchStore';
import {
  ReceiveMessage,
  SearchChannelMessagesResponse,
} from '@/types/message.type';
import { cn } from '@/utils/cn';
import { FetcherMessage } from '@/utils/fetcher';
import queryClient from '@/utils/queryClient';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

interface MessageBubbleProps {
  content: ReceiveMessage['content'];
  className?: string;
  messageId: number;
  isMyMessage: boolean;
}

const MessageBubble = ({
  content,
  className,
  messageId,
  isMyMessage,
}: MessageBubbleProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const { currentChannelId } = useChannelId();

  const { searchDirection, searchCursor, searchKeyword } = useSearchStore(
    useShallow((state) => ({
      searchDirection: state.searchDirection,
      searchCursor: state.searchCursor,
      searchKeyword: state.searchKeyword,
    }))
  );

  const queryKey = {
    channelId: currentChannelId!,
    cursor: searchCursor,
    direction: searchDirection,
    keyword: searchKeyword,
    limit: LIMIT.SEARCH_MESSAGES,
  };

  const data = queryClient.getQueryData(['searchMessages', queryKey]) as
    | (SearchChannelMessagesResponse & { message: FetcherMessage })
    | undefined;

  const searchMessageId = data?.cursors?.search ?? searchCursor;
  const isSearchMessage = searchMessageId === messageId;

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
    });
  }, [data]);

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
