import { API_PATH } from '@/apis/api-path';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';
import fetcher from '@/utils/fetcher';

export interface HubPosts {
  userId?: number;
  userName?: string;
  userNickname: string;
  userJob: string;
  userProfileUrl: string;
  postId: number;
  thumbnailUrl?: string;
  title: string;
  startDate: string;
  duration: string;
  role: 'PROGRAMMER' | 'DESIGNER' | 'ARTIST';
  roleTags: (keyof typeof roleTagItems)[];
  meetingTags: (keyof typeof meetingTagItems)[];
  statusTags: (keyof typeof statusTagItems)[];
  hubTags: (keyof typeof hubTagItems)[];
  bookmarkCount: number;
  applyCount: number;
  viewCount: number;
  createdAt: string;
}

export interface HubPost {
  title: string;
  hubTags: (keyof typeof hubTagItems)[];
  roleTags: (keyof typeof roleTagItems)[];
  meetingTags: (keyof typeof meetingTagItems)[];
  statusTags: (keyof typeof statusTagItems)[];
  skillTags: (keyof typeof skillTagItems)[];
  role: 'PROGRAMMER' | 'ARTIST' | 'DESIGNER';
  startDate: string;
  duration: string;
  contents: string;
  user: {
    userIntroduce: string;
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
  };
}

export interface HubsResponse {
  hubposts: HubPosts[];
}

export interface HubResponse {
  hubpost: HubPost[];
}

export const fetchHubs = async () => {
  try {
    const apiPath = API_PATH.connectionhub;
    const response = await fetcher<HubsResponse>({
      url: apiPath,
      method: 'GET',
    });
    console.log('허브 페이지 데이터 조회 성공');
    return response.data;
  } catch (error) {
    console.error('허브 페이지 데이터 조회 실패', error);
    throw error;
  }
};

export const fetchHub = async () => {
  try {
    const apiPath = API_PATH.connectionhubdetail;
    const response = await fetcher<HubResponse>({
      url: apiPath,
      method: 'GET',
    });
    console.log('허브 디테일 페이지 데이터 조회 성공');
    return response.data;
  } catch (error) {
    console.log('허브 디테일 페이지 데이터 조회 실패', error);
    throw error;
  }
};
