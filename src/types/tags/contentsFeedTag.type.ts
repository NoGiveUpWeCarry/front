export type ContentsFeedTagVariant =
  | '고민'
  | '회고'
  | '아이디어'
  | '계획'
  | '토론'
  | '정보공유'
  | '추천'
  | '질문';

export interface ContentsFeedTagProps {
  label: string;
  variant: ContentsFeedTagVariant;
}
