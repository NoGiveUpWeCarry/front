import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import {
  FollowUsers,
  MusicResponse,
  ProfileHeader,
  ProjectResponse,
  ResumeResponse,
  ResumeType,
  IntroductionSection,
  SettingsResponse,
} from '@/types/mypage.type';
import { User } from '@/types/user.type';
import fetcher from '@/utils/fetcher';

type UserId = {
  userId: number;
};

export const getProfileHeader = async ({ nickname }: { nickname: string }) => {
  const response = await fetcher<ProfileHeader>({
    url: `/users/${nickname}/headers`,
    method: 'GET',
  });
  return response.data;
};

// 소개 페이지

export const getProfileInfo = async ({ userId }: UserId) => {
  const response = await fetcher<IntroductionSection>({
    url: `/users/${userId}`,
    method: 'GET',
  });

  return response.data;
};

export const getFollows = async ({
  userId,
  type,
}: UserId & { type: 'followers' | 'following' }) => {
  const response = await fetcher<{
    followingUsers?: FollowUsers[];
    followerUsers?: FollowUsers[];
  }>({
    url: `/users/${userId}/${type}`,
    method: 'GET',
  });
  return type === 'followers'
    ? response.data?.followerUsers
    : response.data.followingUsers;
};

export const addProject = async ({
  projectInfo,
}: {
  projectInfo: FormData;
}) => {
  const response = await fetcher<ProjectResponse>({
    url: `/users/projects`,
    method: 'POST',
    data: projectInfo,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProject = async ({
  projectId,
  projectInfo,
}: {
  projectId: number;
  projectInfo: FormData;
}) => {
  const response = await fetcher<ProjectResponse>({
    url: `/users/projects/${projectId}`,
    method: 'PUT',
    data: projectInfo,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProject = async ({ projectId }: { projectId: number }) => {
  const response = await fetcher({
    url: `/users/projects/${projectId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const addWorks = async ({ musicUrl }: { musicUrl: string }) => {
  const response = await fetcher<MusicResponse>({
    url: `/users/artist/works`,
    method: 'POST',
    data: { musicUrl },
  });
  return response.data;
};

export const deleteWork = async ({ workId }: { workId: number }) => {
  const response = await fetcher({
    url: `/users/artist/works/${workId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const updateGithubNickname = async ({
  githubUsername,
}: {
  githubUsername: string;
}) => {
  const response = await fetcher({
    url: `/users/githubNickname`,
    method: 'PATCH',
    data: { githubUsername },
  });

  return response.data;
};

// 지원서 페이지
export const getResume = async ({ userId }: UserId) => {
  const response = await fetcher<ResumeResponse>({
    url: `/users/profile/resume/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const makeResume = async ({
  resumeData,
}: {
  resumeData: ResumeType;
}) => {
  const response = await fetcher({
    url: `/users/profile/resume`,
    method: 'POST',
    data: resumeData,
  });
  return response.data;
};

export const updateResume = async ({
  resumeData,
  resumeId,
}: {
  resumeData: ResumeType;
  resumeId: number;
}) => {
  const response = await fetcher({
    url: `/users/profile/resume/${resumeId}`,
    method: 'PATCH',
    data: resumeData,
  });
  return response.data;
};

export const deleteResume = async (resumeId: { resumeId: number }) => {
  const response = await fetcher({
    url: `/users/profile/resume/${resumeId}`,
    method: 'DELETE',
  });
  return response.data;
};

// 피드 페이지
export interface Feed {
  commentCount: number;
  content: string;
  id: number;
  likeCount: number;
  tags: string[];
  thumbnailUrl: string | null;
  title: string;
  users: User;
  view: number;
  createdAt: string;
}

export interface FeedResponse {
  currentPage: number;
  feeds: Feed[];
  totalCount: number;
  totalPages: number;
}

export const getFeed = async ({
  userId,
  page,
  limit,
}: {
  userId: number;
  page?: number;
  limit?: number;
}) => {
  const response = await fetcher<FeedResponse>({
    url: `/users/${userId}/feeds`,
    method: 'GET',
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// 커넥션 허브 페이지
export interface Project {
  projectPostId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  role: roleItemsKey;
  skills: string[];
  detailRoles: roleTagItemsKey[];
  hubType: HubTagItemsKey;
  startDate: string;
  duration: string;
  workType: meetingTagItemskey;
  applyCount: number;
  bookmarkCount: number;
  viewCount: number;
  status: statusTagItemskey;
  createdAt: string;
}

export interface HubResponse {
  currentPage: number;
  projects: Project[];
  totalCount: number;
  totalPages: number;
}

export const getConnectionHub = async ({
  userId,
  type,
  page,
  limit,
}: {
  userId: number;
  type: 'applied' | 'created';
  page?: number;
  limit?: number;
}) => {
  const response = await fetcher<HubResponse>({
    url: `/users/${userId}/connection-hub`,
    method: 'GET',
    params: {
      type,
      page,
      limit,
    },
  });
  return response.data;
};

// 설정 페이지

export const getSettings = async () => {
  const response = await fetcher<SettingsResponse>({
    url: `/users/profile/settings`,
    method: 'GET',
  });
  return response.data;
};

// 계정 설정

export const updateProfileImage = async ({ file }: { file: FormData }) => {
  const response = await fetcher({
    url: `/users/profile/image`,
    method: 'PATCH',
    data: file,
  });
  return response.data;
};

export const updateNickname = async ({ nickname }: { nickname: string }) => {
  const response = await fetcher({
    url: `/users/profile/nickname`,
    method: 'PATCH',
    data: { nickname },
  });
  return response.data;
};

export const updateIntroduction = async ({
  introduce,
}: {
  introduce: string;
}) => {
  const response = await fetcher({
    url: `/users/profile/introduce`,
    method: 'PATCH',
    data: { introduce },
  });
  return response.data;
};

export const updateStatus = async ({ id }: { id: number }) => {
  const response = await fetcher({
    url: `/users/profile/status`,
    method: 'PATCH',
    data: { statusId: id },
  });
  return response.data;
};

export interface DetailJob {
  category: string;
  jobDetail: string;
}

export const updateDetailJob = async ({
  detailJobData,
}: {
  detailJobData: DetailJob;
}) => {
  const response = await fetcher({
    url: `/users/profile/job`,
    method: 'PATCH',
    data: detailJobData,
  });
  return response.data;
};

export const addSkills = async ({ skillData }: { skillData: string[] }) => {
  const response = await fetcher({
    url: `/users/profile/skills`,
    method: 'POST',
    data: { skills: skillData },
  });
  return response.data;
};

export const deleteSkill = async ({ skillData }: { skillData: string[] }) => {
  const response = await fetcher({
    url: `/users/profile/skills`,
    method: 'DELETE',
    data: { skills: skillData },
  });
  return response.data;
};

export const addLink = async ({ link }: { link: string }) => {
  const response = await fetcher({
    url: `/users/profile/links`,
    method: 'POST',
    data: { url: link },
  });
  return response.data;
};

export const deleteLink = async ({ linkId }: { linkId: number }) => {
  const response = await fetcher({
    url: `/users/profile/links`,
    method: 'DELETE',
    data: { linkId },
  });
  return response.data;
};

export const updateLink = async ({
  linkId,
  url,
}: {
  linkId: number;
  url: string;
}) => {
  const response = await fetcher({
    url: `/users/profile/links`,
    method: 'PATCH',
    data: {
      linkId,
      url,
    },
  });
  return response.data;
};

// 알림 설정
export interface Notification {
  pushAlert: boolean;
  followingAlert: boolean;
  projectAlert: boolean;
}

export const updateNotification = async ({
  notification,
}: {
  notification: Notification;
}) => {
  const response = await fetcher({
    url: `/users/profile/notification`,
    method: 'PATCH',
    data: { notification },
  });
  return response.data;
};

// 계정 삭제
export const deleteAccount = async () => {
  const response = await fetcher({
    url: `/users/account`,
    method: 'DELETE',
  });
  return response.data;
};
