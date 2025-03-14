import { RoleProps } from '@/components/atoms/Role';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { MeetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import { RoleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { StatusTagItemskey } from '@/constants/hub/statusTagItems';

interface User {
  userId: number;
  userName: string;
  userNickname: string;
  userProfileUrl: string;
}

export interface FeedResult extends User {
  feedId: number;
  title: string;
  tags: string[];
  createdAt: string;
}

export interface ProjectResult extends User {
  userRole: RoleItemKeys;
  projectId: number;
  title: string;
  role: RoleProps['role'];
  detailRoles: RoleTagItemsKey[];
  skills: string[];
  startDate: string;
  duration: string;
  hubType: HubTagItemsKey;
  workType: MeetingTagItemskey;
}

export interface SearchModalResponse {
  feedResult: {
    feeds: FeedResult[];
    hasMore: boolean;
  };
  projectResult: {
    projects: ProjectResult[];
    hasMore: boolean;
  };
}

interface ConnectionHubResponse extends ProjectResult {
  applyCount: number;
  bookMarkCount: number;
  viewCount: number;
  status: StatusTagItemskey;
  createdAT: string;
  isMarked: boolean;
}

export interface SearchConnectionHubResponse {
  projects: ConnectionHubResponse[];
  pagination: {
    lastCursor: number | null;
  };
}

export interface PostsResponse extends User {
  userRole: string;
  postId: string;
  title: string;
  thumnailUrl: string;
  content: string;
  tags: string[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface SearchPostResponse {
  posts: PostsResponse[];
  pagination: {
    lastCursor: number | null;
  };
}
