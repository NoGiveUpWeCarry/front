import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';

export interface HubItem {
  projectId: number;
  content: string;
  status: keyof typeof statusTagItems;
  workType: keyof typeof meetingTagItems;
  title: string;
  role: keyof typeof roleItems;
  startDate: string;
  duration: string;
  thumbnailUrl?: string;
  hubType: keyof typeof hubTagItems;
  detailRoles: (keyof typeof roleTagItems)[];
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  createdAt: string;
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
  };
}
