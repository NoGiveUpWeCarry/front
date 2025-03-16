import Avatar from '@/components/atoms/Avatar';
import Title from '@/components/atoms/Title';
import ChannelExitButton from '@/components/molecules/chat/ChannelExitButton';
import { ListItem } from '@/components/molecules/ListItem';
import { ChatState, useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { formatDateFromNow } from '@/utils/format';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';

interface ChannelListProps {
  channels: ChatState['channels'];
  currentChannelId: Channel['channelId'] | null;
}

const ChannelList = ({ channels, currentChannelId }: ChannelListProps) => {
  const { setState, messages } = useChatStore(
    useShallow((state) => ({
      setState: state.setState,
      messages: state.messages,
    }))
  );

  const handleChannelClick = (channelId: Channel['channelId']) => {
    setState({ currentChannelId: channelId });
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
            onClick={() => handleChannelClick(channel.channelId)}
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
                <Avatar
                  src={channel.thumbnailURL || undefined}
                  size='xs'
                  className='object-cover'
                />
              </ListItem.Col>
              <ListItem.Col className='w-[calc(100% - 40px)] flex-auto'>
                <div className='flex justify-between gap-2 h-8'>
                  <Title
                    size='xs'
                    fontWeight='medium'
                    lineClamp={1}
                    className='leading-[28px]'
                  >
                    {channel.title}
                  </Title>
                  <div className='w-[100px]'>
                    <ListItem.Label
                      className={clsx('text-caption1', 'text-mediumgray')}
                    >
                      {date}
                    </ListItem.Label>
                    <ChannelExitButton
                      channelId={channel.channelId}
                      className='sr-only group-hover:not-sr-only'
                    />
                  </div>
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
