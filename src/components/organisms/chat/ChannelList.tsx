import Avatar from '@/components/atoms/Avatar';
import { ListItem } from '@/components/molecules/ListItem';
import GroupChannel from '@/components/organisms/chat/GroupChannel';
import PersonalChannel from '@/components/organisms/chat/PersonalChannel';
import TerminatedChannel from '@/components/organisms/chat/TerminatedChannel';
import { useChatStore } from '@/store/chatStore';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';

const ChannelList = () => {
  const { channels, setChannel, currentChannelId } = useChatStore(
    useShallow((state) => ({
      channels: state.channels,
      setChannel: state.setChannel,
      currentChannelId: state.currentChannelId,
    }))
  );
  return (
    <ul className='grow flex flex-col gap-[24px]'>
      {channels.map((channel) => (
        <li key={channel.id} onClick={() => setChannel(channel.id)}>
          <ListItem
            className={clsx([
              'h-[62px] rounded-[8px] cursor-pointer items-center p-[10px] gap-[10px]',
              channel.id === currentChannelId
                ? 'bg-[#EDECF3]'
                : 'hover:bg-[#EDECF3] ',
            ])}
          >
            <ListItem.Col className='w-[40px] h-[40px] shrink-0'>
              <Avatar src={channel.channelThumbnailURL} size='xs' />
            </ListItem.Col>
            <ListItem.Col className='w-[calc(100% - 40px)] flex-auto p'>
              {channel.users.length > 2 && <GroupChannel channel={channel} />}
              {channel.users.length === 2 && (
                <PersonalChannel channel={channel} />
              )}
              {channel.users.length < 2 && <TerminatedChannel />}
            </ListItem.Col>
          </ListItem>
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
