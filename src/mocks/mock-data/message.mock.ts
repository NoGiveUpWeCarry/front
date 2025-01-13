import { channelIds } from '@/mock/channel.mock';
import { users } from '@/mock/user.mock';
import { ReceiveMeesage, SendMessage } from '@/types/message.type';
import { fakerKO as faker } from '@faker-js/faker';

const createMessage = (id: string): SendMessage => {
  return {
    channelId: id,
    content: faker.lorem.paragraph(),
    user: faker.helpers.arrayElement(users),
    type: faker.helpers.arrayElement(['text']),
  };
};

const createMessages = (id: string): ReceiveMeesage[] => {
  return Array.from(
    {
      length: faker.helpers.rangeToNumber({ min: 0, max: 10 }),
    },
    () => ({ ...createMessage(id), date: new Date().toISOString() })
  );
};

export const messages: Record<string, ReceiveMeesage[]> = channelIds.reduce(
  (acc, cur) => {
    acc[cur] = createMessages(cur);
    return acc;
  },
  {} as Record<string, ReceiveMeesage[]>
);
