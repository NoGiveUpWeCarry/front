import FeedContent from '@/mocks/mock-data/feedContent.mock';
import { User } from '@/types/user.type';
import { faker } from '@faker-js/faker';

let idCounter = 1;

const generateUser = (): User => ({
  user_id: faker.number.int({ min: 1, max: 3 }),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  nickname: faker.internet.username(),
  profile_url: faker.image.avatar(),
  auth_provider: faker.helpers.arrayElement(['github', 'google', 'pad']),
  role_id: faker.number.int({ min: 1, max: 3 }),
});

const generateFeed = (userId: number) => ({
  id: faker.string.uuid(),
  userId,
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(2),
  createdAt: faker.date.past(),
  thumnail_url: faker.image.url(),
  likes: faker.number.int({ min: 0, max: 1000 }),
  comments: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () =>
    generateComment()
  ),
});

const generateComment = () => ({
  id: idCounter++,
  userId: faker.number.int({ min: 1, max: 3 }),
  profile_url: faker.image.avatar(),
  content: FeedContent,
  createdAt: faker.date.past(),
  likes: faker.number.int({ min: 0, max: 100 }),
});

export const generateMockData = (userCount = 3, feedCount = 10) => {
  const users = Array.from({ length: userCount }, generateUser);
  const feeds = Array.from({ length: feedCount }, () =>
    generateFeed(faker.helpers.arrayElement(users).user_id)
  );
  return { users, feeds };
};

const mockData = generateMockData();
console.log(mockData);
