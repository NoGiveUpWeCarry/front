import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import { usePatchFeedLike } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

interface FeedFooterProps {
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  isLiked: boolean;
  postId: number;
}

export const FeedFooter = ({
  commentsCount,
  likesCount: initialLikesCount,
  viewsCount,
  isLiked: initialIsLiked,
  postId,
}: FeedFooterProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuthStore((state) => state);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: toggleLike } = usePatchFeedLike();

  const handleLikeClick = () => {
    if (!isLoggedIn || !userInfo.userId) {
      const answer = window.confirm(
        '로그인이 필요합니다. 로그인을 하시겠습니까?'
      );
      if (answer) {
        navigate('/login');
        return;
      }
      return;
    }
    if (isLoading) return;
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);
    toggleLike(
      { id: postId },
      {
        onSuccess: () => {
          console.log('좋아요 상태 변경 성공');
          setIsLoading(false);
        },
        onError: () => {
          console.error('좋아요 상태 변경 실패');
          setIsLiked((prev) => !prev);
          setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div className='flex items-center space-x-1'>
        <Icon type='comment' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{commentsCount}</span>
      </div>

      <div
        className={`flex items-center space-x-1 ${
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handleLikeClick}
      >
        <Icon
          type={isLiked ? 'likeSolid' : 'like'}
          color={isLiked ? 'red' : 'gray'}
          className='w-[24px] h-[24px]'
        />
        <span className='text-[#838383]'>{likesCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewsCount}</span>
      </div>
    </div>
  );
};
