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

export const useGetProfileHeader = (userId: number) => {
  return useQuery({
    queryKey: ['profile-header-info', userId],
    queryFn: () => getProfileHeader({ userId }),
    enabled: !!userId,
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

export const useDeleteProject = (userId: number) => {
  return useMutation({
    mutationFn: ({ projectId }: { projectId: number }) =>
      deleteProject({ projectId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile-info', userId],
      });
    },
  });
};

export const useAddMusicWork = (userId: number) => {
  return useMutation({
    mutationFn: ({ musicUrl }: { musicUrl: string }) => addWorks({ musicUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile-info', userId],
      });
    },
  });
};

export const useDeleteMusicWork = (userId: number) => {
  return useMutation({
    mutationFn: ({ workId }: { workId: number }) => deleteWork({ workId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile-info', userId],
      });
    },
  });
};

export const useUpdateGithubNickname = () => {
  return useMutation({
    mutationFn: ({ githubUsername }: { githubUsername: string }) =>
      updateGithubNickname({ githubUsername }),
  });
};
