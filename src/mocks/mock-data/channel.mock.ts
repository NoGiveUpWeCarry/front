import { createMessages } from '@/mocks/mock-data/message.mock';
import { users } from '@/mocks/mock-data/user.mock';
import { MockChannel } from '@/types/channel.type';
import { fakerKO as faker } from '@faker-js/faker';

export const createChannel = (
  channelId: MockChannel['channelId']
): MockChannel => {
  return {
    channelId,
    thunmbnailURL: faker.image.avatar(), // 개인 채팅일 경우 상대방 프로필, 단체 채팅일 경우 방장 프로필, 종료된 채팅일 경우 뭐로 하지
    users: users,
    title: faker.lorem.text(),
    type: faker.helpers.arrayElement(['group', 'private']),
    messages: createMessages(
      faker.helpers.rangeToNumber({ min: 10, max: 30 }),
      channelId
    ),
  };
};

export const channelIds: MockChannel['channelId'][] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
];

export const channels = channelIds.map((channelId) => createChannel(channelId));
