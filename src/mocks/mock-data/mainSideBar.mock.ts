import { MainSideBarItemType } from '@/types/mainSideBarItem.type';
import { faker } from '@faker-js/faker';

// 단일 항목 생성 함수
export const generateSingleMainSideBar = (): MainSideBarItemType => {
  return {
    rank: 0,
    userNickname: faker.internet.userName(),
    userProfileUrl: faker.image.avatar(),
    userRole: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
    title: faker.lorem.sentence(),
  };
};

// 배열 생성 함수
export const generateMainSideBarList = (
  count: number
): MainSideBarItemType[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...generateSingleMainSideBar(),
    rank: index + 1, // 1부터 순차적으로 rank 할당
  }));
};
