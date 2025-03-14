import { useCallback, useEffect, useRef } from 'react';
// 실제 API와 연동하기 위한 fetchHubs 함수 (경로는 프로젝트 구조에 맞게 수정)
import { HubItem } from '@/mocks/mock-data/hubItem'; // 실제 API 응답 형태에 맞춰 타입 조정 필요
import { useInfiniteFetchHubs } from '@/hooks/queries/hub.query';
import useHubSearchStore from '@/store/hubSeartchStore';
import { HubContents } from '@/components/organisms/hub/HubContents';

const Hub = () => {
  const { sort, role, unit } = useHubSearchStore((state) => state);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFetchHubs(sort, role || '', unit || '');
  const flattenedData: HubItem[] =
    data?.pages.flatMap((page) => page.projects) || [];
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

  return (
    <div className='flex flex-col gap-[30px] w-full h-full'>
      {flattenedData.map((item) => (
        <div
          key={item.projectId}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('.bookmark-button')) {
              return;
            }
          }}
        >
          <HubContents
            key={item.projectId}
            user={item.user}
            title={item.title}
            workType={item.workType}
            status={item.status}
            hubType={item.hubType}
            detailRoles={item.detailRoles}
            role={item.role}
            bookMarkCount={item.bookMarkCount}
            applyCount={item.applyCount}
            viewCount={item.viewCount}
            thumbnailUrl={item.thumbnailUrl}
            startDate={item.startDate}
            duration={item.duration}
            createdAt={item.createdAt}
            projectId={item.projectId}
          />
        </div>
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

export default Hub;
