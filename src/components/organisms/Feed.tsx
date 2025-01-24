import { FeedContents } from '@/components/molecules/contents/ContentsItem';
import { useEffect, useRef, useCallback } from 'react';
import useFeedSearchStore from '@/store/feedSearchStore';
import { useInfiniteFetchFeeds } from '@/hooks/queries/feed.query';
import { Post } from '@/apis/feed';

const Feed = () => {
  const { latest, tags } = useFeedSearchStore((state) => state);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFetchFeeds(latest, tags || '');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const flattenedData: Post[] = data?.pages.flatMap((page) => page.posts) || [];
  console.log('flattenedData: ', flattenedData);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className='flex flex-col gap-[30px] w-full'>
      {flattenedData.map((item) => (
        <FeedContents
          key={item.postId}
          {...item}
          feedTags={item.tags}
          user={{
            avatarSrc: item.userProfileUrl,
            name: item.userNickname,
            job: item.userRole,
            time: item.createdAt,
          }}
        />
      ))}
      {!flattenedData.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
      {hasNextPage && <div ref={observerRef} className='h-10 w-full' />}
    </div>
  );
};

export default Feed;
