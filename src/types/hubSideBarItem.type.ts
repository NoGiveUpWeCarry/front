import { hubTagItemskey } from '@/constants/hub/hubTagItems';

export interface HubSideBarItemType {
  rank: number;
  userNickname: string;
  userProfileUrl: string;
  userRole: string;
  hubTags: hubTagItemskey;
  title: string;
}
