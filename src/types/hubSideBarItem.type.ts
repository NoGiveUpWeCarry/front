import { hubTagItems } from '@/constants/hub/hubTagItems';
import { roleItems } from '@/constants/hub/roleItems';

export interface HubSideBarItemType {
  projectId: number;
  title: string;
  user: {
    userId: number;
    name: string;
    nickname: string;
    profileUrl: string;
    role: keyof typeof roleItems;
  };
  hubType: keyof typeof hubTagItems;
}
