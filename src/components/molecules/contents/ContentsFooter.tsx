import Icon from '@/components/atoms/Icon';
import {
  useTogledHubBookmark,
  useFetchBookmarkStatus,
} from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HubFooterProps {
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  bookmarked?: boolean;
  projectId: number;
}

export const HubFooter = ({
  bookMarkCount: initialBookMarkCount,
  applyCount,
  viewCount,
  bookmarked: initialIsBookmarked,
  projectId,
}: HubFooterProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuthStore((state) => state);
  const [bookmarked, setBookmarked] = useState(initialIsBookmarked);
  const [bookMarkCount, setBookMarkCount] = useState(initialBookMarkCount);
  const [isLoading, setIsLoading] = useState(false);

  // 북마크 상태
  const { data: bookmarkStatus } = isLoggedIn
    ? useFetchBookmarkStatus(projectId)
    : { data: null };

  const { mutate: toggleBookmark } = useTogledHubBookmark();

  useEffect(() => {
    if (bookmarkStatus) {
      setBookmarked(bookmarkStatus.bookmarked);
    }
  }, [bookmarkStatus]);

  const handleBookmarkClick = () => {
    if (!isLoggedIn || !userInfo?.userId) {
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

    setBookmarked((prev) => !prev);
    setBookMarkCount((prev) => (bookmarked ? prev - 1 : prev + 1));
    setIsLoading(true);
    toggleBookmark(
      { projectId },
      {
        onSuccess: () => {
          console.log('북마크 상태 변경 성공');
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('북마크 상태 변경 실패:', error);
          setBookmarked((prev) => !prev);
          setBookMarkCount((prev) => (bookmarked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div
        className={`flex items-center space-x-1 bookmark-button ${
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handleBookmarkClick}
      >
        <Icon
          type={bookmarked ? 'bookmarkSolid' : 'bookmark'}
          color={bookmarked ? 'red' : 'gray'}
          className='w-[24px] h-[24px]'
        />
        <span className='text-[#838383]'>{bookMarkCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='user' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{applyCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewCount}</span>
      </div>
    </div>
  );
};
