const formatTimeAgo = (date: string): string => {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - givenDate.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hourDiff = Math.floor(minutesDiff / 60);
  if (hourDiff < 1) {
    if (minutesDiff <= 5) {
      return '지금';
    }
    return `${minutesDiff}분 전`;
  }
  if (hourDiff < 24) {
    return `${hourDiff}시간 전`;
  }
  const daysDiff = Math.floor(hourDiff / 24);
  return `${daysDiff}일 전`;
};

export default formatTimeAgo;
