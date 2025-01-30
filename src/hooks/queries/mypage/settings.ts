import {
  addLink,
  addSkills,
  deleteAccount,
  deleteLink,
  deleteSkill,
  DetailJob,
  getSettings,
  Notification,
  updateDetailJob,
  updateIntroduction,
  updateLink,
  updateNickname,
  updateNotification,
  updateProfileImage,
  updateStatus,
} from '@/apis/mypage';
import queryClient from '@/utils/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetSettingsInfo = () => {
  return useQuery({
    queryKey: ['settings-info'],
    queryFn: () => getSettings(),
  });
};

export const successHandler = () => {
  queryClient.invalidateQueries({ queryKey: ['settings-info'] });
};

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: ({ nickname }: { nickname: string }) =>
      updateNickname({ nickname }),
  });
};

export const useUpdateImage = () => {
  return useMutation({
    mutationFn: ({ file }: { file: FormData }) => updateProfileImage({ file }),
  });
};

export const useUpdateIntroduction = () => {
  return useMutation({
    mutationFn: ({ introduce }: { introduce: string }) =>
      updateIntroduction({ introduce }),
    onSuccess: successHandler,
  });
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => updateStatus({ id }),
    onSuccess: successHandler,
  });
};

export const useUpdateDetailJob = () => {
  return useMutation({
    mutationFn: ({ detailJobData }: { detailJobData: DetailJob }) =>
      updateDetailJob({ detailJobData }),
    onSuccess: successHandler,
  });
};

export const useAddSkills = () => {
  return useMutation({
    mutationFn: ({ skillData }: { skillData: string[] }) =>
      addSkills({ skillData }),
    onSuccess: successHandler,
  });
};

export const useDeleteSkills = () => {
  return useMutation({
    mutationFn: ({ skillData }: { skillData: string[] }) =>
      deleteSkill({ skillData }),
    onSuccess: successHandler,
  });
};

export const useAddLink = () => {
  return useMutation({
    mutationFn: ({ link }: { link: string }) => addLink({ link }),
    onSuccess: successHandler,
  });
};

export const useDeleteLink = () => {
  return useMutation({
    mutationFn: ({ linkId }: { linkId: number }) => deleteLink({ linkId }),
    onSuccess: successHandler,
  });
};

export const useUpdateLink = () => {
  return useMutation({
    mutationFn: ({ linkId, url }: { linkId: number; url: string }) =>
      updateLink({ linkId, url }),
    onSuccess: successHandler,
  });
};

export const useUpdateNoti = () => {
  return useMutation({
    mutationFn: ({ noti }: { noti: Notification }) =>
      updateNotification({ notification: noti }),
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
