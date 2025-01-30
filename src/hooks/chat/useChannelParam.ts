import { useParams } from 'react-router-dom';

export const useChannelParam = () => {
  const params = useParams();
  const currentChannelId = params.channelId
    ? Number(params.channelId)
    : undefined;

  return { currentChannelId };
};
