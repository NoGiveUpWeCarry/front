import DateText from '@/components/atoms/DateText';
import { useGetFeeds } from '@/hooks/queries/mypage/feed';
import { useMyPageStore } from '@/store/mypageStore';
import { useShallow } from 'zustand/shallow';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedItem from '@/components/molecules/contents/FeedItem';
import { FeedFooter } from '@/components/molecules/contents/FeedFooter';
import { TagItemKey } from '@/constants/tagItem';

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
