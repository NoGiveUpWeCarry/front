import { Channel } from '@/types/chat.type';
import Avatar from '@/components/atoms/Avatar';
import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';

interface TerminatedChannelProps {
  channel: Channel;
}

const TerminatedChannel = ({ channel }: TerminatedChannelProps) => {
  return (
    <ListItem
      className={clsx([
        'h-[62px] rounded-[8px] cursor-pointer items-center p-[10px]',
        channel.selected ? 'bg-[#EDECF3]' : 'hover:bg-[#EDECF3] ',
      ])}
    >
      <ListItem.Col className='w-[44px] h-[44px] shrink-0'>
        <Avatar
          src={channel.roomThumbnailURL}
          className='w-[44px] h-[44px] grayscale'
        />
      </ListItem.Col>
      <ListItem.Col className='w-[calc(100% - 44px)] flex-auto p'>
        <ListItem.Subtitle className={clsx('text-caption1', 'text-mediumgray')}>
          종료된 채팅입니다.
        </ListItem.Subtitle>
      </ListItem.Col>
    </ListItem>
  );
};

export default TerminatedChannel;
