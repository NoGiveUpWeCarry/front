import Icon from '@/components/atoms/Icon';
import { usePatchFeedLike } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { Post } from '@/types/feed.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

interface FeedDetailFooterProps
  extends Pick<
    Post,
    'commentCount' | 'likeCount' | 'viewCount' | 'isLiked' | 'postId'
  > {}

const FeedDetailFooter = ({
  commentCount,
  likeCount: initialLikesCount,
  viewCount,
  isLiked: initialIsLiked,
  postId,
}: FeedDetailFooterProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuthStore(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
      userInfo: state.userInfo,
    }))
  );
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
    <div className='fixed bottom-[10px] left-[30%] h-[40px] w-full text-white text-heading2 hidden md:flex'>
      <div className='flex justify-between bg-[rgb(75,75,75)] rounded-lg items-center px-2 w-80 py-1'>
        <div className='flex text-[18px] h-full items-center px-5'>
          <Icon
            type='chatBubbleOvalLeftEllipsis'
            className='w-5 h-5 text-zinc-300'
          />
          &nbsp;
          {commentCount}
        </div>
        <div
          className={`flex h-full px-5 rounded-sm items-center justify-center cursor-pointer hover:bg-gray text-[18px] ${
            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleLikeClick}
        >
          <Icon
            type={'likeSolid'}
            color={isLiked ? 'red' : 'black'}
            className='w-5 h-5 text-zinc-300'
          />
          &nbsp;
          {likesCount}
        </div>
        <div className='flex text-[18px] h-full items-center px-5'>
          <Icon type='eye' className='w-5 h-5 text-zinc-300' />
          &nbsp;
          {viewCount}
        </div>
        <div className='flex text-[18px] h-full items-center px-5'>
          <Icon type='eye' className='w-5 h-5 text-zinc-300' />
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default FeedDetailFooter;
