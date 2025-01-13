export interface HubItemType {
  title: string;
  role: 'PROGRAMMER' | 'DESIGNER' | 'ARTIST';
  startDate: string;
  duration: string;
  thumbnail?: string;
  projectTags: { label: string; variant: string }[];
  hubTags: { label: string; variant: string }[];
  roleTags: { label: string; variant: string }[];
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  user: {
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
  };
}

export const hubItem: HubItemType[] = [
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
  {
    title: '실시간 여행 계획 플랫폼 프로젝트 진행합니다! .',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    thumbnail: 'src/assets/images/contentimagetest.png',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    thumbnail: 'src/assets/images/contentimagetest.png',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    thumbnail: 'src/assets/images/contentimagetest.png',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    thumbnail: 'src/assets/images/contentimagetest.png',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
  {
    title:
      '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
    role: 'PROGRAMMER' as const,
    startDate: '2025-01-06',
    duration: '6개월',
    thumbnail: 'src/assets/images/contentimagetest.png',
    projectTags: [{ label: 'PROJECT', variant: 'PROJECT' as const }],
    hubTags: [
      { label: 'ONLINE', variant: 'ONLINE' as const },
      { label: 'OPEN', variant: 'OPEN' as const },
    ],
    roleTags: [
      { label: '#프론트엔드 개발자', variant: '프론트엔드 개발자' as const },
      { label: '#서버/백엔드 개발자', variant: '서버/백엔드 개발자' as const },
      { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
    ],
    bookmarkCount: 12,
    userCount: 5,
    viewsCount: 6,
    user: {
      avatarSrc: '/src/assets/images/example.svg',
      name: 'leechan',
      job: 'Programmer',
      time: '약 4시간 전',
    },
  },
];
