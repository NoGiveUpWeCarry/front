import Avatar from '@/components/atoms/Avatar';
import { ListItem } from '@/components/molecules/ListItem';
import GroupChannel from '@/components/organisms/chat/GroupChannel';
import PersonalChannel from '@/components/organisms/chat/PersonalChannel';
import TerminatedChannel from '@/components/organisms/chat/TerminatedChannel';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';

interface ChannelListProps {
  channels?: Channel[];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  const { setChannel, currentChannelId } = useChatStore(
    useShallow((state) => ({
      setChannel: state.setChannel,
      currentChannelId: state.currentChannelId,
    }))
  );
  const switchChannel = (channelId: string) => {
    setChannel(channelId);
  };
  return (
    <ul className='grow flex flex-col gap-[24px]'>
      {channels?.map((channel) => (
        <li
          key={channel.channelId}
          onClick={() => switchChannel(channel.channelId)}
        >
          <ListItem
            className={clsx([
              'h-[62px] rounded-[8px] cursor-pointer items-center p-[10px] gap-[10px]',
              channel.channelId === currentChannelId
                ? 'bg-[#EDECF3]'
                : 'hover:bg-[#EDECF3] ',
            ])}
          >
            <ListItem.Col className='w-[40px] h-[40px] shrink-0'>
              {/* <Avatar src={channel.channelThumbnailURL} size='xs' /> */}
              <Avatar size='xs' />
            </ListItem.Col>
            <ListItem.Col className='w-[calc(100% - 40px)] flex-auto p'>
              {channel.channelId}
              {/* {channel.users.length > 2 && <GroupChannel channel={channel} />}
              {channel.users.length === 2 && (
                <PersonalChannel channel={channel} />
              )}
              {channel.users.length < 2 && <TerminatedChannel />} */}
            </ListItem.Col>
          </ListItem>
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
