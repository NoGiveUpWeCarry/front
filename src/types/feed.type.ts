import { tagItem } from '@/constants/tagItem';

import { tagItem } from '@/constants/tagItem';

export type TagVariant =
  | '정보공유'
  | '질문'
  | '아이디어'
  | '토론'
  | '고민'
  | '회고'
  | '계획'
  | '추천';

export interface Tag {
  label: string;
  variant: TagVariant;
}

export interface User {
  avatarSrc: string;
  name: string;
  job: string;
  time: string;
}

export interface FeedItemType {
  user: User;
  title: string;
  body: string;
  tags: Tag[];
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  thumbnail?: string;
}

export interface Post {
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  postId: number;
  title: string;
  content: string;
  tags: (keyof typeof tagItem)[];
  createdAt: string;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: number;
}
