import { SearchChannelMessages } from '@/apis/channel.api';
import { ChatState, useChatStore } from '@/store/chatStore';
import { SearchState, useSearchStore } from '@/store/searchStore';
import { SearchChannelMessagesResponse } from '@/types/message.type';
import { FetcherMessage } from '@/utils/fetcher';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const useSearchMessages = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>,
  keyword: string
) => {
  const [data, setData] = useState<
    (SearchChannelMessagesResponse & { message: FetcherMessage }) | null
  >(null);
  const [isFetching, setIsFetching] = useState(false);

  const { setState, cursors } = useSearchStore(
    useShallow((state) => ({
      setState: state.setState,
      cursors: state.cursors,
    }))
  );
  const setMessages = useChatStore((state) => state.setMessages);

  const prevDirection = useRef<SearchState['direction']>('backward');

  const loadMore = async (direction: SearchState['direction']) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const result = await SearchChannelMessages({
        keyword: keyword,
        channelId: currentChannelId,
        limit: 15,
        cursor: cursors.search,
        direction: direction,
      });
      prevDirection.current = direction;
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  // 검색 버튼 눌렀을 때
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) {
      alert('키워드를 입력해주세요');
      return;
    }

    if (isFetching) return;
    setIsFetching(true);
    try {
      const result = await SearchChannelMessages({
        keyword: keyword,
        channelId: currentChannelId,
        limit: 30,
        cursor: null,
        direction: 'backward',
      });
      prevDirection.current = 'backward';
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  // 패칭된 데이터로 상태 업데이트
  useEffect(() => {
    if (data) {
      const { messages, message, cursors } = data;
      if (message.code === 404) {
        alert(message.text);
        return;
      }
      setState({
        cursors: cursors,
        lastSearchKeyword: keyword,
        // direction: prevDirection.current,
        mode: 'search',
      });
      setMessages(messages, currentChannelId);
    }
  }, [data]);

  return { loadMore, handleSearch, cursors };
};
