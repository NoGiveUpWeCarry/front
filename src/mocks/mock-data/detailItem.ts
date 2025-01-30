import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';

export interface DetailItem {
  projectId: number;
  title: string;
  hubType: keyof typeof hubTagItems;
  status: keyof typeof statusTagItems;
  workType: keyof typeof meetingTagItems;
  role: keyof typeof roleItems;
  skills: (keyof typeof skillTagItems)[];
  detailRoles: (keyof typeof roleTagItems)[];
  startDate: string;
  duration: string;
  contents: string;
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
    createdAt?: string;
    introduce: string;
  };
}

// export const DetailItem: DetailItemType[] = [
//   {
//     title:
//       '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
//     role: 'PROGRAMMER' as const,
//     startDate: '2025-01-06',
//     duration: '3개월',
//     meetingTags: 'ONLINE',
//     hubTags: 'PROJECT',
//     statusTags: 'OPEN',
//     skillTags: ['3D Modeling', 'Ableton Live'],
//     roleTags: ['HW/임베디드', 'SW/솔루션', 'IOS 개발자'],
//     contents: 'asdfasdfasdf',
//     user: {
//       userProfileUrl: '/src/assets/images/example.svg',
//       userNickname: 'leechan',
//       userRole: 'Programmer',
//       userIntroduce: 'asdflkjasfdlasjdfl',
//       createdAt: '6시간전',
//     },
//   },
// ];
