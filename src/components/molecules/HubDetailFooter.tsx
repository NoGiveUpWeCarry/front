import Icon from '@/components/atoms/Icon';
import {
  useFetchBookmarkStatus,
  useTogledHubBookmark,
} from '@/hooks/queries/hub.query';
import { useEffect, useState } from 'react';

interface HubDetailFooterProps {
  bookmarkCount: number;
  applyCount: number;
  viewCount: number;
  bookmarked?: boolean;
  projectId: number;
}

const HubDetailFooter = ({
  bookmarkCount: initialBookmarkCount,
  applyCount,
  bookmarked: initialIsBookmarked,
  viewCount,
  projectId,
}: HubDetailFooterProps) => {
  const [bookmarked, setBookmarked] = useState(initialIsBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarkCount);
  const [isLoading, setIsLoading] = useState(false);

  const { data: bookmarkStatus } = useFetchBookmarkStatus(projectId);

  const { mutate: toggleBookmark } = useTogledHubBookmark();

  useEffect(() => {
    if (bookmarkStatus) {
      setBookmarked(bookmarkStatus.bookmarked);
    }
  }, [bookmarkStatus]);

  const handleBookmarkClick = () => {
    setBookmarked((prev) => !prev);
    setBookmarkCount((prev) => (bookmarked ? prev - 1 : prev + 1));
    setIsLoading(true);
    toggleBookmark(
      { projectId },
      {
        onSuccess: () => setIsLoading(false),
        onError: (error) => {
          console.error('북마크 상태 변경 실패:', error);
          setBookmarked((prev) => !prev);
          setBookmarkCount((prev) => (bookmarked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className='fixed bottom-[10px] bg-[#4B4B4B] ml-[20px] w-[760px] h-[40px] rounded-[10px] py-[10px] px-[200px] hidden md:flex text-white text-heading2'>
      <div className='flex w-full justify-between'>
        <div
          className={`flex ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleBookmarkClick}
        >
          <Icon
            type={bookmarked ? 'bookmarkSolid' : 'bookmark'}
            color={bookmarked ? 'red' : 'white'}
            className='w-[24px] h-[24px]'
          />
          &nbsp;
          {bookmarkCount}
        </div>
        <div className='flex'>
          <Icon type='user' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {applyCount}
        </div>
        <div className='flex'>
          <Icon type='eye' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {viewCount}
        </div>
      </div>
    </div>
  );
};

export default HubDetailFooter;
