import { fetchChannel, fetchChannelMessages } from '@/apis/channel.api';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const useChannel = () => {
  const { currentChannelId, messages } = useChatStore(
    useShallow((state) => ({
      currentChannelId: state.currentChannelId,
      messages: state.messages,
    }))
  );
  const [channel, setChannel] = useState<Channel | null>(null);
  const [currentChannelMessages, setCurrentChannelMessages] = useState<
    ReceiveMessage[]
  >([]);

  useEffect(() => {
    if (!currentChannelId) return;
    fetchChannel(currentChannelId).then((data) => setChannel(data.channel));
  }, [currentChannelId]);

  useEffect(() => {
    if (!currentChannelId) return;
    if (messages[currentChannelId]) {
      // 이미 messages state에 에 해당 채널의 메시지 내용이 저장되어있을 경우 새로 fetch할 필요 없음
      setCurrentChannelMessages(messages[currentChannelId]);
      return;
    }
    fetchChannelMessages(currentChannelId).then((data) => {
      useChatStore.setState((state) => {
        if (!state.messages[currentChannelId]) {
          state.messages[currentChannelId] = [];
        }
        console.log(state.messages[currentChannelId]);
        state.messages[currentChannelId] = [
          ...state.messages[currentChannelId],
          ...data.messages,
        ];
      });
      setCurrentChannelMessages(data.messages);
    });
  }, [messages[currentChannelId!]]);

  return { channel, currentChannelMessages };
};
