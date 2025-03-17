import { Channel } from '@/types/channel.type';
import { useParams } from 'react-router-dom';

export const useChannelId = () => {
  const { channelId } = useParams();

  if (channelId) {
    return { currentChannelId: Number(channelId) as Channel['channelId'] };
  } else {
    return { currentChannelId: null };
  }
};
