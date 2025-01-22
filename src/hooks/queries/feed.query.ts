import {
  FeedChatResponse,
  FeedRequest,
  FeedResponse,
  Post,
  deleteFeedChat,
  fetchFeed,
  fetchFeedChats,
  postFeed,
  postFeedChat,
} from '@/apis/feed';
import queryClient from '@/utils/queryClient';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

// 피드 상세 불러오기
export const useFetchFeed = (
  id: number
): UseQueryResult<FeedResponse, Error> => {
  return useQuery<FeedResponse>({
    queryKey: ['feed', id],
    queryFn: () => fetchFeed(id),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// 피드 댓글 불러오기
export const useFetchFeedChat = (
  id: number
): UseQueryResult<FeedChatResponse, Error> => {
  return useQuery<FeedChatResponse>({
    queryKey: ['feedChats', id],
    queryFn: () => fetchFeedChats(id),
    retry: 10,
    refetchInterval: 60 * 1000,
  });
};

export const usePostFeed = () => {
  return useMutation({
    mutationFn: async ({ title, tags, content }: FeedRequest) => {
      return await postFeed(title, tags, content);
    },
    onSuccess: () => {
      console.log('피드 작성 성공');
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
      return await postFeedChat(id, content);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['feedChats', id] as [string, number],
      });
      console.log('댓글 작성 성공');
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
      return await deleteFeedChat(postId, commentId);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['feedChats', postId] as [string, number],
      });
      console.log('댓글 작성 성공');
    },
    onError: (error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    },
  });
};
