import { useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { useShallow } from 'zustand/shallow';
import { useMessageState } from '@/hooks/chat/useMessageState';
import { useMessageScroll } from '@/hooks/chat/useMessageScroll';
import { MessageList } from '@/components/organisms/chat/MessageList';
import { NewMessageNotification } from '@/components/molecules/chat/NewMessageNotification';
import LoadingDots from '@/components/molecules/LoadingDots';
import { useChatStore } from '@/store/chatStore';

interface ChatMessagesProps {
  currentChannelId: Channel['channelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const hasNewMessage = useChatStore((state) => state.hasNewMessage);

  const {
    setSearchState,
    searchMode,
    searchKeyword,
    searchDirection,
    searchCursor,
  } = useSearchStore(
    useShallow((state) => ({
      setSearchState: state.setState,
      searchMode: state.searchMode,
      searchKeyword: state.searchKeyword,
      searchDirection: state.searchDirection,
      searchCursor: state.searchCursor,
    }))
  );

  const {
    messages,
    searchMessageId,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingSearchMessages,
  } = useMessageState({
    currentChannelId,
    searchKeyword,
    searchDirection,
    searchMode,
    searchCursor,
  });

  const { loadNextRef, newMessageRef, scrollContainerRef, handleImageLoaded } =
    useMessageScroll({
      messages,
      searchMode,
      onFetchNext: fetchNextPage,
      onFetchPrevious: fetchPreviousPage,
    });

  const handleNewMessageClick = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    setSearchState({ searchMode: false });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center grow'>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      <MessageList
        messages={messages}
        searchMessageId={searchMessageId}
        loadNextRef={loadNextRef}
        showNextRef={hasNextPage && !isFetchingSearchMessages && !isFetching}
        isFetchingNextPage={isFetchingNextPage}
        handleImageLoaded={handleImageLoaded}
      />
      <NewMessageNotification
        show={hasNewMessage}
        onClick={handleNewMessageClick}
        ref={newMessageRef}
      />
    </div>
  );
};

export default ChatMessages;
