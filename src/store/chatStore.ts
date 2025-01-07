import { channels, messages } from '@/mock/chat.mock';
import { Channel, Message } from '@/types/chat.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChatState {
  channels: Channel[];
  messages: Record<string, Message[]>;
  currentChannelId: string;
}

interface ChatAction {
  setChannel: (channelId: string) => void;
}

export const useChatStore = create<ChatState & ChatAction>()(
  immer((set) => ({
    channels: channels,
    messages: messages,
    currentChannelId: 'ch1',
    setChannel: (channelId) => {
      set((state) => {
        state.currentChannelId = channelId;
      });
    },
  }))
);
