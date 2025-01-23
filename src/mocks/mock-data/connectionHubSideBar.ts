import { HubTagVariant } from '@/types/tags/hubTag.type';

// TODO: 확인 필요 / 다른 곳에서 사용하지 않는 타입 같으니 확인하시고 수정 부탁드립니다.
export interface SideBarItem {
  id: number;
  name: string;
  role: string;
  subtitle: string;
  label: HubTagVariant;
}

export const connectionHubSideBar: SideBarItem[] = [
  {
    id: 1,
    name: '아이유',
    role: 'Artist',
    subtitle: '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥dasfjhaskfdhaskf',
    label: 'OUTSOURCING',
  },
  {
    id: 2,
    name: '윈터',
    role: 'Artist',
    subtitle: '실시간',
    label: 'OUTSOURCING',
  },
  {
    id: 3,
    name: '카리나',
    role: 'Artist',
    subtitle: 'git flow ... 알려주세요 ...',
    label: 'PROJECT',
  },
  {
    id: 4,
    name: '김지원',
    role: 'Artist',
    subtitle: '눈물의 여왕 ...',
    label: 'PROJECT',
  },
  {
    id: 5,
    name: '페이커',
    role: 'Artist',
    subtitle: 'Faker #KR1',
    label: 'PROJECT',
  },
];
