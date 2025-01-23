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
  let title = channel.title;
  let thumbnailURL = channel.thumbnailURL;
  switch (channel.type) {
    case 'group':
      break;
    case 'private':
      title =
        channel.users.find((user) => user.userId !== myUserId)?.nickname ||
        '채팅방 제목';
      thumbnailURL = channel.users.find(
        (user) => user.userId !== myUserId
      )?.userImage;
      break;
  }
  return {
    ...channel,
    title,
    thumbnailURL,
  };
};

export const formatDateFromNow = (date: string) => {
  return dayjs(date).fromNow(true);
};

export const formatTime = (date: string, format: string = 'HH:mm') => {
  return dayjs(date).format(format);
};
