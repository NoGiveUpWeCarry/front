import ChatHeader from '@/components/organisms/chat/ChatHeader';
import ChatInput from '@/components/molecules/chat/ChatInput';
import ChatBody from '@/components/organisms/chat/ChatBody';
import { useEffect } from 'react';
import { initialState, useSearchStore } from '@/store/searchStore';
import { useChannelId } from '@/hooks/chat/useChannelId';

const ChatRoom = () => {
  const setSearchState = useSearchStore((state) => state.setState);
  const { currentChannelId } = useChannelId();

  useEffect(() => {
    setSearchState({ ...initialState });
  }, [currentChannelId]);
  return (
    <div className='flex flex-col h-full'>
      <ChatHeader currentChannelId={currentChannelId} />
      <ChatBody currentChannelId={currentChannelId} />
      {currentChannelId && <ChatInput currentChannelId={currentChannelId} />}
    </div>
  );
};

export default ChatRoom;
