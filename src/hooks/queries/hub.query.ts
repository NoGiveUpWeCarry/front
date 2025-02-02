import {
  deleteHub,
  fetchApplicants,
  fetchApplicantsStatus,
  fetchApply,
  fetchApplyStatus,
  fetchBookmarkStatus,
  fetchCancelApply,
  fetchHub,
  fetchHubs,
  fetchStatus,
  HubRequest,
  HubResponse,
  HubsResponse,
  postHub,
  putHub,
  togledBookmark,
  uploadHubImage,
} from '@/apis/hub.api';

import queryClient from '@/utils/queryClient';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useInfiniteFetchHubs = (
  sort: boolean,
  role: string,
  unit: string
): UseInfiniteQueryResult<InfiniteData<HubsResponse>, Error> => {
  return useInfiniteQuery<
    HubsResponse,
    Error,
    InfiniteData<HubsResponse>,
    [string, boolean, string, string]
  >({
    queryKey: ['projects', sort, unit, role],
    queryFn: ({ pageParam }) =>
      fetchHubs({
        cursor: pageParam as number,
        role,
        unit,
        sort,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination || lastPage.pagination.lastCursor === null) {
        return undefined;
      }
      return lastPage.pagination.lastCursor;
    },
    initialPageParam: 0,
  });
};

export const useFetchHub = (
  projectId: number
): UseQueryResult<HubResponse, Error> => {
  return useQuery<HubResponse>({
    queryKey: ['project', projectId],
    queryFn: () => fetchHub(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useDeleteHub = () => {
  return useMutation({
    mutationFn: async (projectId: number) => {
      return deleteHub(projectId);
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    },
    onError: (error) => {
      console.error('허브 삭제 중 오류 발생', error);
    },
  });
};

export const useTogledHubBookmark = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return togledBookmark(projectId);
    },
    onSuccess: () => {
      console.log('허브 북마크 변경 성공');
    },
    onError: (error) => {
      console.error('허브 북마크 처리중 오류 발생:', error);
    },
  });
};

export const changeHubStatus = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      recruiting,
    }: {
      projectId: number;
      recruiting: boolean;
    }) => {
      return fetchStatus(projectId, recruiting);
    },
    onSuccess: () => {
      console.log('허브 상태 변경 성공');
    },
    onError: (error) => {
      console.error('허브 상태 변경 중 오류 발생:', error);
    },
  });
};

export const applyHub = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return fetchApply(projectId);
    },
    onSuccess: () => {
      console.log('허브 지원 성공');
    },
    onError: (error) => {
      console.error('허브 지원 실패', error);
    },
  });
};

export const applyCancel = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return fetchCancelApply(projectId);
    },
    onSuccess: () => {
      console.log('허브 지원 취소');
    },
    onError: (error) => {
      console.error('허브 지원 취소 실패', error);
    },
  });
};

export const useFetchApplicants = (projectId: number) => {
  return useQuery({
    queryKey: ['applyList', projectId],
    queryFn: () => fetchApplicants(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const applicantsStatus = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      userId,
      status,
    }: {
      projectId: number;
      userId: number;
      status: string;
    }) => {
      return fetchApplicantsStatus(projectId, userId, status);
    },
    onSuccess: () => {
      console.log('지원 상태 변경');
    },
    onError: (error) => {
      console.log('지원 상태 변경 실패', error);
    },
  });
};

export const useFetchBookmarkStatus = (projectId: number) => {
  return useQuery({
    queryKey: ['bookmarkStatus', projectId],
    queryFn: () => fetchBookmarkStatus(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useFetchApplyStatus = (projectId: number) => {
  return useQuery({
    queryKey: ['applyStatus', projectId],
    queryFn: () => fetchApplyStatus(projectId),
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

export const usePutHub = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
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
    }: {
      projectId: number;
      title: string;
      content: string;
      role: string;
      hub_type: string;
      start_date: string;
      duration: string;
      work_type: string;
      recruiting: boolean;
      skills: string[];
      detail_roles: string[];
    }) => {
      return putHub(
        projectId,
        title,
        content,
        role,
        hub_type,
        start_date,
        duration,
        work_type,
        recruiting,
        skills,
        detail_roles
      );
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    },
    onError: (error) => {
      console.error('허브 수정 중 오류 발생:', error);
    },
  });
};

interface UsePostImageParams {
  file: File;
}

interface UsePostImageResponse {
  imageUrl: string;
}

export const useHubPostImage = (): UseMutationResult<
  UsePostImageResponse,
  Error,
  UsePostImageParams
> => {
  return useMutation({
    mutationFn: async ({ file }: UsePostImageParams) => {
      return uploadHubImage(file);
    },
    onSuccess: (data) => {
      console.log('이미지 업로드 성공:', data);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};
