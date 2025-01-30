import {
  fetchHub,
  fetchHubs,
  HubRequest,
  HubResponse,
  HubsResponse,
  postHub,
} from '@/apis/hub.api';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useFetchHubs = (): UseQueryResult<HubsResponse, Error> => {
  return useQuery<HubsResponse>({
    queryKey: ['hubs'],
    queryFn: () => fetchHubs(),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// 피드 상세 불러오기
export const useFetchHub = (): UseQueryResult<HubResponse, Error> => {
  return useQuery<HubResponse>({
    queryKey: ['hub'],
    queryFn: () => fetchHub(),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const usePostHub = (): UseMutationResult<
  unknown,
  Error,
  HubRequest,
  unknown
> => {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      role,
      hub_type,
      start_date,
      duration,
      work_type,
      recruiting,
      skills,
      detail_roles,
    }: HubRequest) => {
      return postHub({
        title,
        content,
        role,
        hub_type,
        start_date,
        duration,
        work_type,
        recruiting,
        skills,
        detail_roles,
      });
    },
    onSuccess: () => {
      console.log('허브 작성 성공');
    },
    onError: (error) => {
      console.error('허브 작성 중 오류 발생:', error);
    },
  });
};
