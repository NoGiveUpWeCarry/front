import {
  addProject,
  addWorks,
  deleteProject,
  deleteWork,
  getFollows,
  getProfileHeader,
  getProfileInfo,
  updateGithubNickname,
  updateProject,
} from '@/apis/mypage';
import queryClient from '@/utils/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

const successHandler = (nickname: string) => {
  queryClient.invalidateQueries({
    queryKey: ['profile-info', nickname],
  });
};

export const useGetProfileHeader = (nickname: string) => {
  return useQuery({
    queryKey: ['profile-header-info', nickname],
    queryFn: () => getProfileHeader({ nickname }),
    enabled: !!nickname,
  });
};

export const useGetProfileInfo = (userId: number) => {
  return useQuery({
    queryKey: ['profile-info', userId],
    queryFn: () => getProfileInfo({ userId }),
    enabled: !!userId,
  });
};

export const useGetFollows = ({
  type,
  userId,
}: {
  type: 'followers' | 'following';
  userId: number;
}) => {
  return useQuery({
    queryKey: ['follows', userId, type],
    queryFn: () => getFollows({ userId, type }),
    enabled: !!userId,
  });
};

export const useAddProject = () => {
  return useMutation({
    mutationFn: ({ projectInfo }: { projectInfo: FormData }) =>
      addProject({ projectInfo }),
  });
};

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      projectInfo,
    }: {
      projectId: number;
      projectInfo: FormData;
    }) => updateProject({ projectId, projectInfo }),
  });
};

export const useDeleteProject = (nickname: string) => {
  return useMutation({
    mutationFn: ({ projectId }: { projectId: number }) =>
      deleteProject({ projectId }),
    onSuccess: () => successHandler(nickname),
  });
};

export const useAddMusicWork = (nickname: string) => {
  return useMutation({
    mutationFn: ({ musicUrl }: { musicUrl: string }) => addWorks({ musicUrl }),
    onSuccess: () => successHandler(nickname),
  });
};

export const useDeleteMusicWork = (nickname: string) => {
  return useMutation({
    mutationFn: ({ workId }: { workId: number }) => deleteWork({ workId }),
    onSuccess: () => successHandler(nickname),
  });
};

export const useUpdateGithubNickname = () => {
  return useMutation({
    mutationFn: ({ githubUsername }: { githubUsername: string }) =>
      updateGithubNickname({ githubUsername }),
  });
};
