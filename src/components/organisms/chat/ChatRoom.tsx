import ChatHeader from '@/components/organisms/chat/ChatHeader';
import ChatInput from '@/components/molecules/chat/ChatInput';
import ChatBody from '@/components/organisms/chat/ChatBody';
import ChatMessages from '@/components/organisms/chat/ChatMessages';
import ChatMessagesWelcome from '@/components/molecules/chat/ChatMessagesWelcome';
import ChatHeaderInfo from '@/components/molecules/chat/ChatHeaderInfo';
import ChatHeaderWelcome from '@/components/molecules/chat/ChatHeaderWelcome';
import { useEffect } from 'react';
import { initialState, useSearchStore } from '@/store/searchStore';
import { useChannelId } from '@/hooks/chat/useChannelId';

const ChatRoom = () => {
  const setState = useSearchStore((state) => state.setState);
  const { currentChannelId } = useChannelId();
  useEffect(() => {
    setState({ ...initialState });
  }, [currentChannelId]);
  return (
    <>
      <ChatHeader>
        {currentChannelId ? (
          <ChatHeaderInfo currentChannelId={currentChannelId} />
        ) : (
          <ChatHeaderWelcome />
        )}
      </ChatHeader>
      <ChatBody>
        {currentChannelId ? (
          <ChatMessages currentChannelId={currentChannelId} />
        ) : (
          <ChatMessagesWelcome />
        )}
      </ChatBody>
      {currentChannelId && <ChatInput currentChannelId={currentChannelId} />}
    </>
  );
};

export default ChatRoom;
