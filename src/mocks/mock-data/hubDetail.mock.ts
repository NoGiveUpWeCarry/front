import { hubTagItems, hubTagItemskey } from '@/constants/hub/hubTagItems';
import {
  meetingTagItems,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { roleTagItems, roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { skillTagItems, skillTagItemsKey } from '@/constants/hub/skillTagItems';
import {
  statusTagItems,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';
import { DetailItemType } from '@/mocks/mock-data/detailItem';
import { faker } from '@faker-js/faker';

const skillTagOptions = Object.keys(skillTagItems) as skillTagItemsKey[];
const meetingTagOptions = Object.keys(meetingTagItems) as meetingTagItemskey[];
const hubTagOptions = Object.keys(hubTagItems) as hubTagItemskey[];
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

const createdAt = faker.date.recent({ days: 7 }); // 최근 7일 이내
const timeAgo = calculateTimeAgo(createdAt);

export const generatesingleHubDetail = (): DetailItemType => {
  return {
    title: faker.lorem.sentence(),
    role: faker.helpers.arrayElement(['PROGRAMMER', 'DESIGNER', 'ARTIST']),
    startDate: faker.date.future().toISOString().split('T')[0],
    duration: `${faker.number.int({ min: 1, max: 12 })}개월`,
    hubTags: faker.helpers.arrayElement(hubTagOptions),
    meetingTags: faker.helpers.arrayElement(meetingTagOptions),
    statusTags: faker.helpers.arrayElement(statusTagOptions),
    roleTags: getRandomElements(roleTagOptions, 1, 3),
    skillTags: getRandomElements(skillTagOptions, 1, 3),
    contents: faker.lorem.lines(),
    user: {
      userProfileUrl: faker.image.avatar(),
      userNickname: faker.internet.userName(),
      userRole: faker.helpers.arrayElement([
        'Programmer',
        'Artist',
        'Designer',
      ]),
      userIntroduce: faker.person.jobDescriptor(),
      createdAt: timeAgo,
    },
  };
};

// 목데이터 생성
const ITEM_COUNT = 1;

export const hubDetailMocks: DetailItemType[] = Array.from(
  { length: ITEM_COUNT },
  () => generatesingleHubDetail()
);
