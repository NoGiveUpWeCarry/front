import { fakerKO as faker } from '@faker-js/faker';
import {
  roleTagItems,
  type RoleTagItemsKey,
} from '@/constants/hub/roleTagsItems';
import {
  meetingTagItems,
  type MeetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { hubTagItems, HubTagItemsKey } from '@/constants/hub/hubTagItems';
import {
  statusTagItems,
  type StatusTagItemskey,
} from '@/constants/hub/statusTagItems';
import { HubItem } from '@/mocks/mock-data/hubItem';

const meetingTagOptions = Object.keys(meetingTagItems) as MeetingTagItemskey[];
const hubTagOptions = Object.keys(hubTagItems) as HubTagItemsKey[];
const statusTagOptions = Object.keys(statusTagItems) as StatusTagItemskey[];
const roleTagOptions = Object.keys(roleTagItems) as RoleTagItemsKey[];

const getRandomElements = <T>(array: T[], min: number, max: number): T[] => {
  const count = faker.number.int({ min, max });
  return faker.helpers.shuffle(array).slice(0, count);
};

let projectId = 0;
// 단일 HubItemType 생성 함수
export const generateSingleHub = (): HubItem => {
  return {
    projectId: ++projectId,
    content: faker.lorem.paragraph(),
    title: faker.lorem.sentence(),
    role: faker.helpers.arrayElement(['Programmer', 'Designer', 'Artist']),
    startDate: faker.date.future().toISOString().split('T')[0],
    duration: `${faker.number.int({ min: 1, max: 12 })}개월`,
    workType: faker.helpers.arrayElement(meetingTagOptions),
    hubType: faker.helpers.arrayElement(hubTagOptions),
    status: faker.helpers.arrayElement(statusTagOptions),
    detailRoles: getRandomElements(roleTagOptions, 1, 3),
    bookMarkCount: faker.number.int({ min: 0, max: 50 }),
    applyCount: faker.number.int({ min: 0, max: 50 }),
    viewCount: faker.number.int({ min: 0, max: 1000 }),
    createdAt: faker.date.recent({ days: 7 }).toISOString(),
    thumbnailUrl: faker.helpers.maybe(
      () => faker.image.urlLoremFlickr({ category: 'business' }),
      { probability: 0.5 }
    ),
    user: {
      profileUrl: faker.image.avatar(),
      nickname: faker.internet.userName(),
      role: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
    },
  };
};

// 목데이터 생성
const ITEM_COUNT = 20;

export const hubMocks: HubItem[] = Array.from({ length: ITEM_COUNT }, () =>
  generateSingleHub()
);
