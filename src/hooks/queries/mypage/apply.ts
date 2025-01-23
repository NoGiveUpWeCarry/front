import { getResume, makeResume, updateResume } from '@/apis/mypage';
import { ResumeType } from '@/types/mypage.type';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetResume = (userId: number) => {
  return useQuery({
    queryKey: ['get-resume', userId],
    queryFn: () => getResume({ userId }),
    enabled: !!userId,
  });
};

export const useMakeResume = () => {
  return useMutation({
    mutationFn: ({ resumeData }: { resumeData: ResumeType }) =>
      makeResume({ resumeData }),
  });
};

export const useUpdateResume = () => {
  return useMutation({
    mutationFn: ({
      resumeData,
      resumeId,
    }: {
      resumeData: ResumeType;
      resumeId: number;
    }) => updateResume({ resumeData, resumeId }),
  });
};
