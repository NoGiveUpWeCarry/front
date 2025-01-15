import { ReceiveMessage } from '@/types/message.type';
import dayjs from 'dayjs';

export const formatDate = (
  date: string,
  format: string = 'YYYY년 MM월 DD일'
) => {
  return dayjs(date).format(format);
};

export const formatDateMessages = (channelMessages: ReceiveMessage[]) => {
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
