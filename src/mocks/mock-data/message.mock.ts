import { users } from '@/mocks/mock-data/user.mock';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import { fakerKO as faker } from '@faker-js/faker';

let messageCount = 0;
let lastMessageDate = new Date('2025-01-01'); // 초기 날짜 설정

export const createMessage = (
  channelId: Channel['channelId']
): ReceiveMessage => {
  // 이전 메시지 날짜에서 1시간 증가
  lastMessageDate = new Date(lastMessageDate.getTime() + 1000 * 60 * 60); // 1 시간씩 증가
  return {
    channelId: channelId,
    messageId: ++messageCount,
    content: faker.lorem.paragraph(),
    user: faker.helpers.arrayElement(users),
    type: faker.helpers.arrayElement(['text']),
    date: lastMessageDate.toISOString(),
  };
};

export const createMessages = (
  length: number,
  channelId: Channel['channelId']
): ReceiveMessage[] => {
  return Array.from({ length }, () => createMessage(channelId));
};
