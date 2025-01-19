export interface ProfileHeader {
  userId: number;
  nickname: string;
  profileUrl: string;
  role: string;
  introduce: string;
  userLinks: string[];
  isOwnProfile: boolean;
  isFollowing: boolean;
}

export interface ShortProjects {
  title: string;
  description: string;
  links: { type: string; url: string }[];
}

export interface IntroductionSection {
  githubUsername?: string;
  works: ShortProjects[] | string[];
  status: string;
  applyCount: number;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isOwnProfile: boolean;
}

export interface FollowUsers {
  id: number;
  nickname: string;
  profileUrl: string;
}

export interface ShortProject {
  title: string;
  description: string;
  links: { url: string; typeId: number }[];
}

export interface ProjectResponse {
  myPageProjectId: number;
  title: string;
  description: string;
  links: { id: number; url: string; type: string }[];
}

export interface MusicResponse {
  musicId: number;
  musicUrl: string;
}

export interface ResumeType {
  title: string;
  portfolioUrl: string;
  detail: string;
}

export interface ResumeResponse {
  userId: number;
  title: string;
  jobDetail: string;
  skills: string;
  portfolioUrl: string;
  detail: string;
  isOwnProfile: boolean;
}
