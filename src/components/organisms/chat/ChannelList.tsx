import Avatar from '@/components/atoms/Avatar';
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
  const { joinChannel, currentChannelId, messages } = useChatStore(
    useShallow((state) => ({
      joinChannel: state.joinChannel,
      currentChannelId: state.currentChannelId,
      messages: state.messages,
    }))
  );
  const user = useAuthStore((state) => state.userInfo);

  const switchChannel = (channelId: Channel['channelId']) => {
    if (channelId === currentChannelId) return;
    joinChannel(user.userId, channelId);
  };

  const handleChannelClick = (
    e: ReactMouseEvent,
    channelId: Channel['channelId']
  ) => {
    if (e.button === 0) {
      switchChannel(channelId);
    }
  };

  return (
    <ul className='grow flex flex-col gap-[24px] pb-[50px] overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'>
      {Object.entries(channels).map(([_, channel]) => {
        const date = formatDateFromNow(
          messages[channel.channelId]?.at(-1)?.date || channel.lastMessage.date
        );
        const lastMessage =
          messages[channel.channelId]?.at(-1) ?? channel.lastMessage;
        let lastMessageContent: string;
        switch (lastMessage.type) {
          case 'text':
          case 'exit':
            lastMessageContent = lastMessage.content;
            break;
          case 'image':
            lastMessageContent = '이미지를 보냈습니다.';
            break;
        }
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
                    {date}
                  </ListItem.Label>
                </div>
                <ListItem.Subtitle
                  className={clsx('text-caption1', 'text-mediumgray')}
                >
                  {lastMessageContent}
                </ListItem.Subtitle>
              </ListItem.Col>
            </ListItem>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelList;
