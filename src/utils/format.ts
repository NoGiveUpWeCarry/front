import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatDate = (
  date: string,
  format: string = 'YYYY년 MM월 DD일'
) => {
  return dayjs(date).format(format);
};

export const formatDateMessages = (channelMessages: ReceiveMessage[] = []) => {
  const dateMessages = channelMessages.reduce(
    (acc, cur) => {
      const date = formatDate(cur.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cur);
      return acc;
    },
    {} as { [key: string]: ReceiveMessage[] }
  );

  return dateMessages;
};

export const formatChannelData = (channel: Channel, myUserId: number = -1) => {
  console.log(dayjs(channel.lastMessage.date).fromNow(true));
  switch (channel.type) {
    case 'group':
      channel.title = channel.users.map((user) => user.nickname).join(', ');
      break;
    case 'private':
      channel.title =
        channel.users.find((user) => user.userId !== myUserId)?.nickname ||
        '채팅방 제목';
      break;
  }
  channel.lastMessage.date = dayjs(channel.lastMessage.date).fromNow(true);
  return channel;
};
