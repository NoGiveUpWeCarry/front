import dayjs from 'dayjs';

export const formatDate = (
  date: string,
  format: string = 'YYYY년 MM월 DD일'
) => {
  return dayjs(date).format(format);
};
