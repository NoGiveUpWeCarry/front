import { API_PATH } from '@/apis/api-path';
import { tagItem } from '@/constants/tagItem';
import fetcher from '@/utils/fetcher';

export interface Post {
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  postId: number;
  title: string;
  content: string;
  tags: (keyof typeof tagItem)[];
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: number;
}

export interface Comment {
  commentId: number;
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  comment: string;
  createdAt: Date;
  likeCount: number;
  isLiked: boolean;
}

interface FeedResponse {
  post: Post;
}

export interface FeedChatResponse {
  comments: Comment[];
}

export const fetchFeed = async (id: number) => {
  const apiPath = API_PATH.feedDetail.replace(':id', id.toString());
  const response = await fetcher<FeedResponse>({
    url: apiPath,
    method: 'GET',
  });
  console.log('fetchfeed response: ' + response.data);
  return response.data;
};

export const fetchFeedChat = async (id: number) => {
  const apiPath = API_PATH.feedChat.replace(':id', id.toString());
  const response = await fetcher<FeedChatResponse>({
    url: apiPath,
    method: 'GET',
  });
  console.log('피드 상세 채팅 응답', +response.data);
  return response.data;
};
