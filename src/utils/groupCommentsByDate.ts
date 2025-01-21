import { Comment } from '@/apis/feed';

const groupCommentsByDate = (comments: Comment[] = []) => {
  if (comments.length === 0) {
    return null;
  }
  const grouped = comments.reduce(
    (acc, comment) => {
      const dateKey = new Date(comment.createdAt).toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(comment);
      return acc;
    },
    {} as Record<string, Comment[]>
  );

  return Object.entries(grouped).map(([date, comments]) => ({
    date,
    comments,
  }));
};

export default groupCommentsByDate;
