import { users } from '@/mocks/mock-data/user.mock';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { fakerKO as faker } from '@faker-js/faker';

export const createMessage = (
  channelId: Channel['channelId']
): ReceiveMessage => {
  return {
    channelId: channelId,
    content: faker.lorem.paragraph(),
    user: faker.helpers.arrayElement(users),
    type: faker.helpers.arrayElement(['text']),
    date: faker.date
      .between({ from: '2025-01-01', to: Date.now() })
      .toISOString(),
  };
};

export const createMessages = (
  length: number,
  channelId: Channel['channelId']
): ReceiveMessage[] => {
  return Array.from({ length }, () => createMessage(channelId));
};
