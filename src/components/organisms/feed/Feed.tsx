import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useFeedSearchStore from '@/store/feedSearchStore';
import { useInfiniteFetchFeeds } from '@/hooks/queries/feed.query';
import { Post } from '@/apis/feed.api';
import FeedListContent from '@/components/organisms/feed/FeedListContent';

const Feed = () => {
  const location = useLocation();
  const { latest, tags } = useFeedSearchStore((state) => state);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFetchFeeds(latest, tags || '');
  const flattenedData: Post[] = data?.pages.flatMap((page) => page.posts) || [];
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  // ✅ 실시간으로 스크롤 위치 저장
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>; // ✅ setTimeout의 정확한 반환 타입 사용
    const updateScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      intervalId = setTimeout(updateScrollPosition, 500); // ✅ 500ms마다 저장
    };
    updateScrollPosition(); // 초기 실행
    return () => {
      clearTimeout(intervalId); // ✅ 컴포넌트 언마운트 시 정리
    };
  }, []);

  // ✅ 페이지 복귀 시 데이터 로드 후 scrollPosition 적용
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    console.log('페이지 복귀 시 scrollPosition: ', savedPosition);
    if (savedPosition) {
      // ✅ 무한스크롤 데이터가 로딩된 후 스크롤 복원
      const checkDataLoaded = setInterval(() => {
        if (flattenedData.length > 0) {
          console.log('데이터 로드 완료, 스크롤 복원:', savedPosition);
          window.scrollTo(0, parseInt(savedPosition, 10));
          clearInterval(checkDataLoaded);
        }
      }, 100); // ✅ 100ms마다 데이터 로딩 확인
    }
  }, [location.pathname, flattenedData.length]); // ✅ 데이터가 로드된 후 실행

  return (
    <div className='flex flex-col gap-[15px] w-full'>
      {flattenedData.map((item) => (
        <FeedListContent
          key={item.postId}
          title={item.title}
          content={item.content}
          feedTags={item.tags}
          commentsCount={item.commentCount}
          likesCount={item.likeCount}
          viewsCount={item.viewCount}
          thumnailUrl={item.thumnailUrl}
          postId={item.postId}
          isLiked={item.isLiked}
          user={{
            avatarSrc: item.userProfileUrl,
            name: item.userNickname,
            job: item.userRole,
            time: item.createdAt,
            id: item.userId,
          }}
          createdAt={item.createdAt}
        />
      ))}
      {!flattenedData.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
      {hasNextPage && (
        <div ref={observerRef} className='h-10 w-full'>
          로딩중
        </div>
      )}
    </div>
  );
};

export default Feed;
