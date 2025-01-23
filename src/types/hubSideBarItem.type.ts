import { HubTagItemsKey } from '@/constants/hub/hubTagItems';

export interface HubSideBarItemType {
  rank: number;
  userNickname: string;
  userProfileUrl: string;
  userRole: string;
  hubTags: HubTagItemsKey;
  title: string;
}
