import { Channel } from '@/types/chat.type';
import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';

interface GroupChannelProps {
  channel: Channel;
}

const GroupChannel = ({ channel }: GroupChannelProps) => {
  return (
    <>
      <div className='flex justify-between'>
        <Title size='xs' fontWeight='medium' lineClamp={1}>
          {channel.title}
        </Title>
        <ListItem.Label className={clsx('text-caption1', 'text-mediumgray')}>
          {channel.lastSendTime}
        </ListItem.Label>
      </div>
      <ListItem.Subtitle className={clsx('text-caption1', 'text-mediumgray')}>
        {channel.people.join(', ')}
      </ListItem.Subtitle>
    </>
  );
};

export default GroupChannel;
