import { fetchChannelMessages } from '@/apis/channel.api';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const useMessages = (
  currentChannelId: ChatState['currentChannelId']
) => {
  const { handleMessage, messages } = useChatStore(
    useShallow((state) => ({
      handleMessage: state.handleMessage,
      messages: state.messages,
    }))
  );
  useEffect(() => {
    if (!currentChannelId) return;
    fetchChannelMessages(currentChannelId).then((data) => {
      console.log(data);
      for (const message of data.messages) {
        handleMessage(message);
      }
    });
  }, [currentChannelId]);

  return { messages };
};
