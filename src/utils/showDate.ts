export const showDate = (
  createdAt: string,
  lastDate: string
): [boolean, string] => {
  const currentDate = createdAt.split('T')[0];
  const canShow = currentDate !== lastDate;
  lastDate = currentDate;

  return [canShow, lastDate];
};
