import { Channel, Message } from '@/types/chat.type';
import { fakerKO as faker } from '@faker-js/faker';

const channelIds = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'];

const createChannel = (id: string): Channel => {
  return {
    id,
    channelThumbnailURL: faker.image.avatar(),
    title: faker.lorem.text(),
    people: Array.from(
      {
        length: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
      },
      () => faker.person.fullName()
    ),
    lastSendTime: '1h',
  };
};

const createMessage = (id: string): Message => {
  return {
    channelId: id,
    content: faker.lorem.paragraph(),
    sender: faker.person.fullName(),
    type: faker.helpers.arrayElement(['text']),
    date: faker.date.past().toISOString(),
  };
};

const createMessages = (id: string): Message[] => {
  return Array.from(
    {
      length: faker.helpers.rangeToNumber({ min: 0, max: 10 }),
    },
    () => createMessage(id)
  );
};
export const channels: Channel[] = channelIds.map((id) => createChannel(id));

export const messages: Record<string, Message[]> = channelIds.reduce(
  (acc, cur) => {
    acc[cur] = createMessages(cur);
    return acc;
  },
  {} as Record<string, Message[]>
);
