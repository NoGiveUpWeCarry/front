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
  let title: string;
  switch (channel.type) {
    case 'group':
      title = channel.users.map((user) => user.nickname).join(', ');
      break;
    case 'private':
      title =
        channel.users.find((user) => user.userId !== myUserId)?.nickname ||
        '채팅방 제목';
      break;
  }
  return {
    ...channel,
    title,
  };
};

export const formatDateFromNow = (date: string) => {
  return dayjs(date).fromNow(true);
};

export const formatTime = (date: string, format: string = 'HH:MM') => {
  return dayjs(date).format(format);
};
