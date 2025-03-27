import DateText from '@/components/atoms/DateText';
import { useInView } from 'react-intersection-observer';
import { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TagItemKey } from '@/constants/tagItem';
import useMyFeed from '@/hooks/mypage/useMyFeed.business';
import { showDate } from '@/utils/showDate';
import FeedItem from '@/components/organisms/feed/FeedItem';
import { FeedFooter } from '@/components/organisms/feed/FeedFooter';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const FeedLoading = () => {
  return (
    <div className='flex justify-center text-[13px]'>피드 가져오는 중..</div>
  );
};

const FeedError = () => {
  return (
    <div className='flex justify-center text-[13px]'>
      <div className='flex justify-center text-[13px]'>
        에러가 발생했습니다.
      </div>
    </div>
  );
};

const fallbackRender = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  return (
    <>
      <FeedError />
      <button onClick={resetErrorBoundary} className='text-blue-500'>
        재시도
      </button>
    </>
  );
};

const FeedContents = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetching, error } = useMyFeed();
  const feeds = data?.pages.flatMap((page) => page.feeds);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (data === undefined) {
    return <div className='flex justify-center'>피드가 존재하지 않습니다.</div>;
  }

  return (
    <>
      {feeds.map((feed) => {
        let lastDate = '';
        const [show, date] = showDate(feed.createdAt, lastDate);
        lastDate = date;
        return (
          <Link to={`/feed/${feed.id}`} key={feed.title}>
            {show && (
              <DateText hasBg date={feed.createdAt} className='mb-[28px]' />
            )}
            <div className='w-full'>
              <div className='bg-white rounded-[10px] p-[20px] w-full hover:shadow-orange-50'>
                <div className='flex flex-col gap-[20px]'>
                  <FeedItem
                    {...feed}
                    tags={feed.tags as TagItemKey[]}
                    postId={feed.id}
                  />
                  <FeedFooter
                    {...feed}
                    commentsCount={feed.commentCount}
                    likesCount={feed.likeCount}
                    viewsCount={feed.view}
                    isLiked={false}
                    postId={feed.id}
                  />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <div ref={ref} className='h-1' />
    </>
  );
};

const FeedTemplate = () => {
  return (
    <div className='flex flex-col gap-[30px] w-full mt-3'>
      <Suspense fallback={<FeedLoading />}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
              <FeedContents />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    </div>
  );
};

export default FeedTemplate;
