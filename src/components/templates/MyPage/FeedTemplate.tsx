import DateText from '@/components/atoms/DateText';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedItem from '@/components/molecules/contents/FeedItem';
import { FeedFooter } from '@/components/molecules/contents/FeedFooter';
import { TagItemKey } from '@/constants/tagItem';
import { FeedResponse } from '@/apis/mypage';
import useMyFeed from '@/hooks/mypage/useMyFeed.business';
import { showDate } from '@/utils/showDate';

const FeedTemplate = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, error } =
    useMyFeed();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col gap-[30px] w-full mt-3'>
      {isLoading && (
        <div className='flex justify-center text-[13px]'>
          {isLoading && '피드 가져오는 중..'}
          {error && <span className='text-red-500'>에러가 발생했습니다.</span>}
        </div>
      )}
      {data?.pages.map((page: FeedResponse) => {
        let lastDate = '';
        return page.feeds.map((feed) => {
          const [show, date] = showDate(feed.createdAt, lastDate);
          lastDate = date as string;
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
        });
      })}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default FeedTemplate;
