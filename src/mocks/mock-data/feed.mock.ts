import { Comment, FeedsResponse, Post } from '@/apis/feed';
import FeedContent from '@/mocks/mock-data/feedContent.mock';
import { faker } from '@faker-js/faker';

let userIdCounter = 1;
let postIdCounter = 1;
let commentIdCounter = 1;

const TAGS = [
  '고민',
  '회고',
  '아이디어',
  '계획',
  '토론',
  '정보공유',
  '추천',
  '질문',
] as const;

const generateSingleFeed = (): Post => ({
  userId: userIdCounter++,
  userName: faker.person.fullName(),
  userNickname: faker.internet.userName(),
  userRole: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
  userProfileUrl: faker.image.avatar(),
  postId: postIdCounter++,
  title: faker.lorem.sentence(),
  thumbnailUrl: faker.image.url(),
  content: FeedContent,
  tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    faker.helpers.arrayElement(TAGS)
  ),
  commentCount: faker.number.int({ min: 0, max: 50 }),
  likeCount: faker.number.int({ min: 0, max: 1000 }),
  viewCount: faker.number.int({ min: 0, max: 10000 }),
  isLiked: faker.datatype.boolean(),
  createdAt: faker.date.anytime().toISOString(),
});

const generateSingleComment = (): Comment => ({
  commentId: commentIdCounter++,
  userId: userIdCounter++,
  userName: faker.person.fullName(),
  userRole: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
  userProfileUrl: faker.image.avatar(),
  comment: faker.lorem.sentence(),
  createdAt: faker.date.anytime().toISOString(),
  likeCount: faker.number.int({ min: 0, max: 1000 }),
  isLiked: faker.datatype.boolean(),
});

export const generateFeedsMockData = (): Pick<FeedsResponse, 'posts'> => {
  const posts = Array.from({ length: 10 }, generateSingleFeed);
  return { posts };
};

export const generateCommentsMockData = (): Comment[] => {
  return Array.from({ length: 10 }, generateSingleComment);
};
