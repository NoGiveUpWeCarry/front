import { users } from '@/mock/user.mock';
import { Channel } from '@/types/channel.type';
import { fakerKO as faker } from '@faker-js/faker';

export const channelIds = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'];

export const createChannel = (channelId: Channel['channelId']): Channel => {
  return {
    channelId,
    // channelThumbnailURL: faker.image.avatar(), // 개인 채팅일 경우 상대방 프로필, 단체 채팅일 경우 방장 프로필, 종료된 채팅일 경우 뭐로 하지
    // users: users,
    // title: faker.lorem.text(),
    // lastSendTime: '1h',
  };
};

export const channels: Channel[] = channelIds.map((id) => createChannel(id));
