import { ReceiveMessage } from '@/types/message.type';
import { useMemo } from 'react';

interface Params {
  chatMessages: ReceiveMessage[];
  searchMessages?: ReceiveMessage[];
  searchMode: boolean;
  searchCursor?: number | null;
  error: Error | null;
}

export const useMemoizedMessage = ({
  chatMessages,
  searchMessages,
  searchMode,
  searchCursor,
  error,
}: Params) => {
  const messages = useMemo(() => {
    return searchMode && !error
      ? deduplicateAndSortMessages(searchMessages ?? [])
      : deduplicateAndSortMessages(chatMessages);
  }, [searchMessages, chatMessages, searchMode, searchCursor]);

  return { messages };
};

function deduplicateAndSortMessages(
  messages: ReceiveMessage[]
): ReceiveMessage[] {
  // 1. messageId 기준으로 정렬
  const sortedMessages = messages.toSorted((a, b) => a.messageId - b.messageId);

  // 2. 중복 제거 (messageId가 동일한 경우 첫 번째 메시지만 유지)
  const uniqueMessages = sortedMessages.filter((message, index, arr) => {
    return index === 0 || message.messageId !== arr[index - 1].messageId;
  });

  return uniqueMessages;
}
