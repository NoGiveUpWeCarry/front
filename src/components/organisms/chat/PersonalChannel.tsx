import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';
import { Channel } from '@/types/channel.type';

interface PersonalChannelProps {
  channel: Channel;
}

const PersonalChannel = ({ channel }: PersonalChannelProps) => {
  return (
    <div className='flex justify-between'>
      <Title size='xs' fontWeight='medium' lineClamp={1}>
        {channel.channelId}
        {/* {channel.users.map((user) => user.nickname).join(', ')} */}
      </Title>
      <ListItem.Label className={clsx('text-caption1', 'text-mediumgray')}>
        1h
      </ListItem.Label>
    </div>
  );
};

export default PersonalChannel;
