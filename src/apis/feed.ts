import { API_PATH } from '@/apis/api-path';
import { tagItem } from '@/constants/tagItem';
import fetcher from '@/utils/fetcher';

export interface Post {
  userId: number;
  userName: string;
  userNickname: string;
  userRole: string;
  userProfileUrl: string;
  postId: number;
  thumbnailUrl: string;
  content: string;
  title: string;
  tags: (keyof typeof tagItem)[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: number;
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  comment: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface FeedsResponse {
  posts: Post[];
}

export interface FeedResponse {
  post: Post;
}

export interface FeedChatResponse {
  comments: Comment[];
}

export interface FeedRequest {
  title: string;
  tags: string[];
  content: string;
}

export const fetchFeeds = async () => {
  const apiPath = API_PATH.feed;
  const response = await fetcher<FeedsResponse>({
    url: apiPath,
    method: 'GET',
  });
  console.log('피드 메인페이지 데이터 조회');
  return response.data;
};

export const fetchFeed = async (id: number) => {
  const apiPath = API_PATH.feedDetail.replace(':id', id.toString());
  const response = await fetcher<FeedResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchFeedChats = async (id: number) => {
  const apiPath = API_PATH.feedChats.replace(':id', id.toString());
  const response = await fetcher<FeedChatResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const postFeedChat = async (id: number, content: string) => {
  const apiPath = API_PATH.feedChat.replace(':id', id.toString());
  const response = await fetcher({
    url: apiPath,
    method: 'POST',
    data: { content },
  });
  return response.data;
};

export const postFeed = async (
  title: string,
  tags: string[],
  content: string
) => {
  console.log('피드 작성 요청됨');
  const apiPath = API_PATH.feed;
  const response = await fetcher({
    url: apiPath,
    method: 'POST',
    data: {
      title,
      tags,
      content,
    } as FeedRequest,
  });
  return response.data;
};

export const deleteFeedChat = async (
  postId: Post['postId'],
  commentId: Comment['commentId']
) => {
  const apiPath = API_PATH.feedChatDelete
    .replace(':id', postId.toString())
    .replace(':commentId', commentId.toString());
  console.log('apiPath: ', apiPath);
  const response = await fetcher({
    url: apiPath,
    method: 'DELETE',
  });
  return response.data;
};
