import { hubTagItems, HubTagItemsKey } from '@/constants/hub/hubTagItems';
import {
  meetingTagItems,
  type MeetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import {
  roleTagItems,
  type RoleTagItemsKey,
} from '@/constants/hub/roleTagsItems';
import {
  skillTagItems,
  type SkillTagItemsKey,
} from '@/constants/hub/skillTagItems';
import {
  statusTagItems,
  type StatusTagItemskey,
} from '@/constants/hub/statusTagItems';
import { DetailItem } from '@/mocks/mock-data/detailItem';
import { fakerKO as faker } from '@faker-js/faker';

const skillTagOptions = Object.keys(skillTagItems) as SkillTagItemsKey[];
const meetingTagOptions = Object.keys(meetingTagItems) as MeetingTagItemskey[];
const hubTagOptions = Object.keys(hubTagItems) as HubTagItemsKey[];
const statusTagOptions = Object.keys(statusTagItems) as StatusTagItemskey[];
const roleTagOptions = Object.keys(roleTagItems) as RoleTagItemsKey[];

const getRandomElements = <T>(array: T[], min: number, max: number): T[] => {
  const count = faker.number.int({ min, max });
  return faker.helpers.shuffle(array).slice(0, count);
};

// const calculateTimeAgo = (createdAt: Date): string => {
//   const now = new Date();
//   const diffInMs = now.getTime() - createdAt.getTime();
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

//   if (diffInHours < 24) {
//     return `${diffInHours}시간 전`;
//   }

//   const diffInDays = Math.floor(diffInHours / 24);
//   return `${diffInDays}일 전`;
// };

// const createdAt = faker.date.recent({ days: 7 }); // 최근 7일 이내
// const timeAgo = calculateTimeAgo(createdAt);

let projectId = 0;

export const generatesingleHubDetail = (): DetailItem => {
  return {
    applyCount: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    bookMarkCount: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
    projectId: ++projectId,
    viewCount: faker.helpers.rangeToNumber({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    role: faker.helpers.arrayElement(['Programmer', 'Designer', 'Artist']),
    startDate: faker.date.future().toISOString().split('T')[0],
    duration: `${faker.number.int({ min: 1, max: 12 })}개월`,
    hubType: faker.helpers.arrayElement(hubTagOptions),
    workType: faker.helpers.arrayElement(meetingTagOptions),
    status: faker.helpers.arrayElement(statusTagOptions),
    detailRoles: getRandomElements(roleTagOptions, 1, 3),
    skills: getRandomElements(skillTagOptions, 1, 3),
    contents: faker.lorem.lines(),
    user: {
      createdAt: faker.date.recent({ days: 7 }).toISOString(),
      profileUrl: faker.image.avatar(),
      nickname: faker.internet.userName(),
      role: faker.helpers.arrayElement(['Programmer', 'Artist', 'Designer']),
      introduce: faker.person.jobDescriptor(),
    },
  };
};

// 목데이터 생성
const ITEM_COUNT = 1;

export const hubDetailMocks: DetailItem[] = Array.from(
  { length: ITEM_COUNT },
  () => generatesingleHubDetail()
);
