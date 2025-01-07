import { Channel } from '@/types/chat.type';
import Avatar from '@/components/atoms/Avatar';
import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';
import { useChatStore } from '@/store/chatStore';

interface PersonalChannelProps {
  channel: Channel;
}

const PersonalChannel = ({ channel }: PersonalChannelProps) => {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  return (
    <ListItem
      className={clsx([
        'h-[62px] rounded-[8px] cursor-pointer items-center p-[10px]',
        channel.id === currentChannelId
          ? 'bg-[#EDECF3]'
          : 'hover:bg-[#EDECF3] ',
      ])}
    >
      <ListItem.Col className='w-[44px] h-[44px] shrink-0'>
        <Avatar
          src={channel.channelThumbnailURL}
          className='w-[44px] h-[44px]'
        />
      </ListItem.Col>
      <ListItem.Col className='w-[calc(100% - 44px)] flex-auto p'>
        <div className='flex justify-between'>
          <Title size='xs' fontWeight='medium' lineClamp={1}>
            {channel.title}
          </Title>
          <ListItem.Label className={clsx('text-caption1', 'text-mediumgray')}>
            {channel.lastSendTime}
          </ListItem.Label>
        </div>
      </ListItem.Col>
    </ListItem>
  );
};

export default PersonalChannel;
