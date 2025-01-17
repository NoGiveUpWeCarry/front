export const now = new Date();
export const date = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
export const getDate = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
