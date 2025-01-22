import { Comment } from '@/apis/feed';
import { faker } from '@faker-js/faker';

const feedDetailComments: Comment[] = Array.from(
  { length: 20 },
  (_, index) => ({
    commentId: index + 1,
    userId: (index % 7) + 1,
    userName: `User ${index + 1}`,
    userRole: ['Programmer', 'Designer', 'Artist'][index % 3],
    userProfileUrl: faker.image.avatar(),
    comment: `이 토론 정말 흥미롭네요! (댓글 ${index + 1})`,
    createdAt: new Date(),
    likeCount: Math.floor(Math.random() * 10),
    isLiked: index % 2 === 0,
  })
);

export default feedDetailComments;
