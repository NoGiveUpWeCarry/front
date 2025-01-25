import DateText from '@/components/atoms/DateText';
import { useGetFeeds } from '@/hooks/queries/mypage/feed';
import { useMyPageStore } from '@/store/mypageStore';
import { useShallow } from 'zustand/shallow';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeedContents } from '@/components/molecules/contents/ContentsItem';

const FeedTemplate = () => {
  const { ref, inView } = useInView();

  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetFeeds(ownerId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col gap-[30px] w-full mt-3'>
      {data?.pages.map((page) => {
        let lastDate = '';
        return page.feeds.map((feed) => {
          const currentDate = new Date(feed.createdAt).toLocaleDateString();
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;
          return (
            <Link to={`/feed/${feed.id}`} key={feed.title}>
              {showDate && (
                <DateText hasBg date={feed.createdAt} className='mb-[28px]' />
              )}
              <FeedContents
                key={feed.title + new Date().toISOString()}
                {...feed}
                hideUser
                feedTags={[]}
                viewCount={feed.view}
                postId={feed.id}
                isLiked={feed.likeCount > 0}
                thumbnailUrl={feed.thumbnailUrl!}
              />
            </Link>
          );
        });
      })}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default FeedTemplate;
