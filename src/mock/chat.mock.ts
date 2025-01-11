import { createUser, createUsers } from '@/mock/user.mock';
import { Channel, ReceiveMeesage, SendMessage } from '@/types/chat.type';
import { fakerKO as faker } from '@faker-js/faker';

const channelIds = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'];
const users = [...createUsers(5), createUser('me')];

const createChannel = (id: string): Channel => {
  return {
    id,
    channelThumbnailURL: faker.image.avatar(), // 개인 채팅일 경우 상대방 프로필, 단체 채팅일 경우 방장 프로필, 종료된 채팅일 경우 뭐로 하지
    title: faker.lorem.text(),
    users: users,
    lastSendTime: '1h',
  };
};

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
export const channels: Channel[] = channelIds.map((id) => createChannel(id));

export const messages: Record<string, ReceiveMeesage[]> = channelIds.reduce(
  (acc, cur) => {
    acc[cur] = createMessages(cur);
    return acc;
  },
  {} as Record<string, ReceiveMeesage[]>
);
