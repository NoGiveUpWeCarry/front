import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';
import { Channel } from '@/types/channel.type';

interface GroupChannelProps {
  channel: Channel;
}

const GroupChannel = ({ channel }: GroupChannelProps) => {
  return (
    <>
      <div className='flex justify-between'>
        <Title size='xs' fontWeight='medium' lineClamp={1}>
          {channel.channelId}
          {/* {channel.users.map((user) => user.nickname).join(', ')} */}
        </Title>
        <ListItem.Label className={clsx('text-caption1', 'text-mediumgray')}>
          1h
        </ListItem.Label>
      </div>
      <ListItem.Subtitle className={clsx('text-caption1', 'text-mediumgray')}>
        {channel.channelId}
        {/* {channel.users.map((user) => user.nickname).join(', ')} */}
      </ListItem.Subtitle>
    </>
  );
};

export default GroupChannel;
