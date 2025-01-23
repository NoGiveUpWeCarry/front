import { hubTagItemskey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

export interface HubItemType {
  statusTags: statusTagItemskey;
  meetingTags: meetingTagItemskey;
  title: string;
  role: 'PROGRAMMER' | 'DESIGNER' | 'ARTIST';
  startDate: string;
  duration: string;
  thumbnailUrl?: string;
  hubTags: hubTagItemskey;
  roleTags: roleTagItemsKey[];
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  user: {
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
}

export const hubItem: HubItemType[] = [
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    meetingTags: 'ONLINE',
    hubTags: 'PROJECT',
    statusTags: 'OPEN',
    roleTags: ['HW/임베디드', 'SW/솔루션', 'IOS 개발자'],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    thumbnailUrl: 'src/assets/images/contentimagetest.png',
    user: {
      userProfileUrl: '/src/assets/images/example.svg',
      userNickname: 'leechan',
      userRole: 'Programmer',
      createdAt: '약 4시간 전',
    },
  },
];
