import { faker } from '@faker-js/faker';
import { roleTagItems, roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import {
  meetingTagItems,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { hubTagItems, HubTagItemsKey } from '@/constants/hub/hubTagItems';
import {
  statusTagItems,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';
import { HubItemType } from '@/mocks/mock-data/hubItem';

const meetingTagOptions = Object.keys(meetingTagItems) as meetingTagItemskey[];
const hubTagOptions = Object.keys(hubTagItems) as HubTagItemsKey[];
const statusTagOptions = Object.keys(statusTagItems) as statusTagItemskey[];
const roleTagOptions = Object.keys(roleTagItems) as roleTagItemsKey[];

const getRandomElements = <T>(array: T[], min: number, max: number): T[] => {
  const count = faker.number.int({ min, max });
  return faker.helpers.shuffle(array).slice(0, count);
};

const calculateTimeAgo = (createdAt: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

// 단일 HubItemType 생성 함수
export const generateSingleHub = (): HubItemType => {
  const createdAt = faker.date.recent({ days: 7 }); // 최근 7일 이내
  const timeAgo = calculateTimeAgo(createdAt);

  // const hasThumbnail = faker.datatype.boolean();

  return {
    title: faker.lorem.sentence(),
    role: faker.helpers.arrayElement(['PROGRAMMER', 'DESIGNER', 'ARTIST']),
    startDate: faker.date.future().toISOString().split('T')[0],
    duration: `${faker.number.int({ min: 1, max: 12 })}개월`,
    meetingTags: faker.helpers.arrayElement(meetingTagOptions),
    hubTags: faker.helpers.arrayElement(hubTagOptions),
    statusTags: faker.helpers.arrayElement(statusTagOptions),
    roleTags: getRandomElements(roleTagOptions, 1, 3),
    bookmarkCount: faker.number.int({ min: 0, max: 50 }),
    userCount: faker.number.int({ min: 0, max: 50 }),
    viewsCount: faker.number.int({ min: 0, max: 1000 }),
    thumbnailUrl: faker.helpers.maybe(
      () => faker.image.urlLoremFlickr({ category: 'business' }),
      { probability: 0.5 } // 50% 확률로 URL 반환, 나머지는 undefined
    ),
    user: {
      userProfileUrl: faker.image.avatar(),
      userNickname: faker.internet.userName(),
      userRole: faker.helpers.arrayElement([
        'Programmer',
        'Artist',
        'Designer',
      ]),
      createdAt: timeAgo,
    },
  };
};

// 목데이터 생성
const ITEM_COUNT = 20;

export const hubMocks: HubItemType[] = Array.from({ length: ITEM_COUNT }, () =>
  generateSingleHub()
);
