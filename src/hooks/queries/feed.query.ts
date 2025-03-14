import {
  FeedChatResponse,
  FeedRankResponse,
  FeedRequest,
  FeedResponse,
  FeedsResponse,
  Post,
  deleteFeed,
  deleteFeedChat,
  fetchFeed,
  fetchFeedChats,
  fetchFeedRank,
  fetchFeeds,
  patchFeedChat,
  patchFeedLike,
  postFeed,
  postFeedChat,
  putChatLike,
  putFeed,
  Comment,
  uploadImage,
} from '@/apis/feed.api';
import { optimizeImage } from '@/constants/OptimizeImage';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useInfiniteFetchFeeds = (
  latest: boolean,
  tags: string
): UseInfiniteQueryResult<InfiniteData<FeedsResponse>, Error> => {
  return useInfiniteQuery<
    FeedsResponse,
    Error,
    InfiniteData<FeedsResponse>,
    [string, boolean, string]
  >({
    queryKey: ['feeds', latest, tags],
    queryFn: ({ pageParam }) =>
      fetchFeeds({
        cursor: pageParam as number,
        latest,
        tags,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination || lastPage.pagination.lastCursor === null) {
        return undefined;
      }
      return lastPage.pagination.lastCursor;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFetchFeed = (
  id: number,
  options?: { enabled: boolean }
): UseQueryResult<FeedResponse, Error> => {
  return useQuery<FeedResponse>({
    queryKey: ['feed', id],
    queryFn: () => fetchFeed(id),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useFetchFeedChat = (
  id: Post['postId']
): UseQueryResult<FeedChatResponse, Error> => {
  return useQuery<FeedChatResponse>({
    queryKey: ['feedChats', id],
    queryFn: () => fetchFeedChats(id),
    retry: 10,
    refetchInterval: 60 * 1000,
  });
};

export const usePostFeed = (): UseMutationResult<
  unknown,
  Error,
  FeedRequest,
  unknown
> => {
  return useMutation({
    mutationFn: async ({ title, tags, content }: FeedRequest) => {
      return postFeed(title, tags, content);
    },
    onError: (error) => {
      console.error('피드 작성 중 오류 발생:', error);
    },
  });
};

// 피드에 댓글 작성
export const usePostFeedChat = () => {
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      return postFeedChat(id, content);
    },
    onSuccess: (_, { id }) => {
      querySuccessHandler('feedChats', [id]);
    },
    onError: (error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    },
  });
};

export const useDeleteFeedChat = () => {
  return useMutation({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: Post['postId'];
      commentId: number;
    }) => {
      return deleteFeedChat(postId, commentId);
    },
    onSuccess: (_, { postId }) => {
      querySuccessHandler('feedChats', [postId]);
    },
    onError: (error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    },
  });
};

export const useDeleteFeed = () => {
  return useMutation({
    mutationFn: async (postId: Post['postId']) => {
      return deleteFeed(postId);
    },
    onSuccess: () => {
      querySuccessHandler('feed');
    },
    onError: (error) => {
      console.error('피드 삭제 중 오류 발생:', error);
    },
  });
};

export const usePutFeed = () => {
  return useMutation({
    mutationFn: async ({
      id,
      title,
      tags,
      content,
    }: {
      id: Post['postId'];
      title: string;
      tags: string[];
      content: string;
    }) => {
      return putFeed(id, title, tags, content);
    },
    onSuccess: (_, { id }) => {
      querySuccessHandler('feed', [id]);
    },
    onError: (error) => {
      console.error('피드 수정 중 오류 발생:', error);
    },
  });
};

export const usePutChatLike = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return putChatLike(id);
    },
    onError: (error) => {
      console.error('댓글 좋아요 처리중 오류 발생:', error);
    },
  });
};

export const usePatchFeedLike = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return patchFeedLike(id);
    },
    onError: (error) => {
      console.error('피드 좋아요 처리중 오류 발생:', error);
    },
  });
};

export const useFetchFeedRank = (): UseQueryResult<FeedRankResponse, Error> => {
  return useQuery<FeedRankResponse>({
    queryKey: ['feedRank'],
    queryFn: () => fetchFeedRank(),
    retry: 10,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const usePatchFeedChat = () => {
  return useMutation({
    mutationFn: async ({
      id,
      commentId,
      content,
    }: {
      id: Post['postId'];
      commentId: Comment['commentId'];
      content: Comment['comment'];
    }) => {
      return patchFeedChat(id, commentId, content);
    },
    onSuccess: (_, { id }) => {
      querySuccessHandler('feedChats', [id]);
    },
    onError: (error) => {
      console.error('댓글 수정 중 오류 발생:', error);
    },
  });
};

interface UsePostImageParams {
  file: File;
}

interface UsePostImageResponse {
  imageUrl: string;
}

export const usePostImage = (): UseMutationResult<
  UsePostImageResponse,
  Error,
  UsePostImageParams
> => {
  return useMutation({
    mutationFn: async ({ file }: UsePostImageParams) => {
      console.log('🖼️ 원본 이미지 크기:', file.size / 760, 'KB');
      const optimizedFile = await optimizeImage(file);
      console.log('🖼️ 최적화된 이미지 크기:', optimizedFile.size / 760, 'KB');

      return uploadImage(optimizedFile);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};
