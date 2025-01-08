import { Channel } from '@/types/chat.type';
import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';

interface PersonalChannelProps {
  channel: Channel;
}

const PersonalChannel = ({ channel }: PersonalChannelProps) => {
  return (
    <div className='flex justify-between'>
      <Title size='xs' fontWeight='medium' lineClamp={1}>
        {channel.title}
      </Title>
      <ListItem.Label className={clsx('text-caption1', 'text-mediumgray')}>
        {channel.lastSendTime}
      </ListItem.Label>
    </div>
  );
};

export default PersonalChannel;
