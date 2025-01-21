import { API_PATH } from '@/apis/api-path';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';
import fetcher from '@/utils/fetcher';

export interface HubPost {
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

export interface HubsResponse {
  hubposts: HubPost[];
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
