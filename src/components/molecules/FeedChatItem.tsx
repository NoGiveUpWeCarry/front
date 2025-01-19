import { FeedChatResponse } from '@/apis/feed';

const mockFeedChatResponse: FeedChatResponse = {
  comments: [
    {
      commentId: 1,
      userId: 1,
      userName: 'John Doe',
      userRole: 'Designer',
      userProfileUrl: '/images/user1.jpg',
      comment: '이 토론 정말 흥미롭네요!',
      createdAt: new Date('2025-01-01T10:30:00'),
      likeCount: 5,
      isLiked: true,
    },
    {
      commentId: 2,
      userId: 2,
      userName: 'Jane Smith',
      userRole: 'Programmer',
      userProfileUrl: '/images/user2.jpg',
      comment: '저도 동의합니다. 정말 흥미로운 주제예요!',
      createdAt: new Date('2025-01-01T11:00:00'),
      likeCount: 2,
      isLiked: false,
    },
    {
      commentId: 3,
      userId: 3,
      userName: 'Alice Lee',
      userRole: 'Programmer',
      userProfileUrl: '/images/user3.jpg',
      comment: '더 많은 의견을 들어보고 싶습니다.',
      createdAt: new Date('2025-01-02T11:15:00'),
      likeCount: 3,
      isLiked: false,
    },
  ],
};

const FeedChatItem = () => {
  return <div></div>;
};

export default FeedChatItem;
