import { hubTagItems, HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { HubSideBarItemType } from '@/types/hubSideBarItem.type';
import { faker } from '@faker-js/faker';

const hubTagOptions = Object.keys(hubTagItems) as HubTagItemsKey[];

// 랜덤 닉네임 생성 (7글자 내외)
const generateUserNickname = (): string => {
  // faker.internet.userName() 결과를 7글자로 자르거나 새로 생성
  const nickname = faker.internet.userName();
  return nickname.length > 7 ? nickname.slice(0, 7) : nickname.padEnd(7, 'x');
};

// 단일 항목 생성 함수
export const generateSingleHubSideBar = (): HubSideBarItemType => {
  return {
    rank: 0,
    userNickname: generateUserNickname(),
    userProfileUrl: faker.image.avatar(),
    userRole: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
    hubTags: faker.helpers.arrayElement(hubTagOptions),
    title: faker.lorem.sentence(),
  };
};

// 배열 생성 함수
export const generateHubSideBarList = (count: number): HubSideBarItemType[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...generateSingleHubSideBar(),
    rank: index + 1, // 1부터 순차적으로 rank 할당
  }));
};
