import { createUser } from '@/mocks/mock-data/user.mock';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { fakerKO as faker } from '@faker-js/faker';

export const createMessage = (channelId: Channel['channelId']) => {
  return {
    channelId: channelId,
    content: faker.lorem.paragraph(),
    user: createUser(),
    type: faker.helpers.arrayElement(['text']),
    date: new Date().toISOString(),
  };
};

export const createMessages = (
  length: number,
  channelId: Channel['channelId']
): ReceiveMessage[] => {
  return Array.from({ length }, () => createMessage(channelId));
};
