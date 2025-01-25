import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import Title from '@/components/atoms/Title';
import { ListItem } from '@/components/molecules/ListItem';
import useAuthStore from '@/store/authStore';
import { ChatState, useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { formatDateFromNow } from '@/utils/format';
import clsx from 'clsx';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useShallow } from 'zustand/shallow';

interface ChannelListProps {
  channels: ChatState['channels'];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  const { joinChannel, currentChannelId, exitChannel } = useChatStore(
    useShallow((state) => ({
      joinChannel: state.joinChannel,
      currentChannelId: state.currentChannelId,
      exitChannel: state.exitChannel,
    }))
  );
  const user = useAuthStore((state) => state.userInfo);

  const switchChannel = (channelId: Channel['channelId']) => {
    if (channelId === currentChannelId) return;
    joinChannel(user!.userId, channelId);
  };

  const handleChannelClick = (
    e: ReactMouseEvent,
    channelId: Channel['channelId']
  ) => {
    if (e.button === 0) {
      switchChannel(channelId);
    }
  };

  const handleChannelExit = () => {
    if (window.confirm('현재 채팅방을 나가시겠습니까?')) {
      // console.log(`${currentChannelId} 번 채팅방 나감`);
      const userId = useAuthStore.getState().userInfo.userId;
      exitChannel(userId, currentChannelId!);
    } else {
      console.log('나가기 취소');
    }
  };

  return (
    <ul className='grow flex flex-col gap-[24px] pb-[50px]'>
      {Object.entries(channels).map(([_, channel]) => {
        return (
          <li
            key={channel.channelId}
            onClick={(e) => handleChannelClick(e, channel.channelId)}
            className='group relative'
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
                <Avatar src={channel.thumbnailURL || undefined} size='xs' />
              </ListItem.Col>
              <ListItem.Col className='w-[calc(100% - 40px)] flex-auto p'>
                <div className='flex justify-between'>
                  <Title size='xs' fontWeight='medium' lineClamp={1}>
                    {channel.title}
                  </Title>
                  <ListItem.Label
                    className={clsx('text-caption1', 'text-mediumgray')}
                  >
                    {formatDateFromNow(channel.lastMessage.date)}
                  </ListItem.Label>
                </div>
                <ListItem.Subtitle
                  className={clsx('text-caption1', 'text-mediumgray')}
                >
                  {channel.lastMessage.content}
                </ListItem.Subtitle>
              </ListItem.Col>
            </ListItem>
          </li>
        );
      })}
      {currentChannelId && (
        <div className='mt-auto flex justify-end'>
          <button
            onClick={handleChannelExit}
            aria-label='채팅방 나가기'
            className='flex items-center text-darkgray hover:text-[#333] h-[38px] gap-[5px]'
          >
            <div>나가기</div>
            <Icon type='exit' className='text-inherit w-[24px] h-[24px]' />
          </button>
        </div>
      )}
    </ul>
  );
};

export default ChannelList;
