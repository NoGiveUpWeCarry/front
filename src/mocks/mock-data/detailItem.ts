import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { skillTagItemsKey } from '@/constants/hub/skillTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

export interface DetailItemType {
  title: string;
  hubTags: HubTagItemsKey;
  meetingTags: meetingTagItemskey;
  statusTags: statusTagItemskey;
  roleTags: roleTagItemsKey[];
  skillTags: skillTagItemsKey[];
  role: 'PROGRAMMER' | 'ARTIST' | 'DESIGNER';
  startDate: string;
  duration: string;
  contents: string;
  user: {
    userIntroduce: string;
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
}

export const DetailItem: DetailItemType[] = [
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '3개월',
    meetingTags: 'ONLINE',
    hubTags: 'PROJECT',
    statusTags: 'OPEN',
    skillTags: ['3D Modeling', 'Ableton Live'],
    roleTags: ['HW/임베디드', 'SW/솔루션', 'IOS 개발자'],
    contents: 'asdfasdfasdf',
    user: {
      userProfileUrl: '/src/assets/images/example.svg',
      userNickname: 'leechan',
      userRole: 'Programmer',
      userIntroduce: 'asdflkjasfdlasjdfl',
      createdAt: '6시간전',
    },
  },
];
