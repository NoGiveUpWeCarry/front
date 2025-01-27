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
  userRole: string;
  projectId: number;
  title: string;
  role: string;
  detailRoles: string[];
  skills: string[];
  startDate: string;
  duration: string;
  hubType: '프로젝트' | '외주';
  workType: '온라인' | '오프라인';
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
  status: string;
  createdAt: string;
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
  thumbnailUrl: string;
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
