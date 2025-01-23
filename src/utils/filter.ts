import { ChatState } from '@/store/chatStore';
export const filterChannels = (
  keyword: string,
  channels: ChatState['channels']
) => {
  return Object.fromEntries(
    Object.entries(channels).filter(([_, channel]) =>
      channel.title.includes(keyword.trim())
    )
  );
};
