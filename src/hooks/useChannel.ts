import { fetchChannel } from '@/apis/channel.api';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const useChannel = (currentChannelId: ChatState['currentChannelId']) => {
  const { handleChannelAdded, channels } = useChatStore(
    useShallow((state) => ({
      handleChannelAdded: state.handleChannelAdded,
      channels: state.channels,
    }))
  );

  useEffect(() => {
    if (!currentChannelId) return;
    fetchChannel(currentChannelId).then((data) => {
      handleChannelAdded(data.channel);
    });
  }, [currentChannelId]);

  return { channels };
};
