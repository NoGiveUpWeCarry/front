import { useInfiniteFetchHubs } from '@/hooks/queries/hub.query';
import { HubContents } from '@/components/organisms/hub/HubContents';
import { useInView } from 'react-intersection-observer';
import useHubSearchStore from '@/store/hubSeartchStore';
import { useEffect } from 'react';

const Hub = () => {
  const { sort, role, unit } = useHubSearchStore((state) => state);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFetchHubs(sort, role || '', unit || '');

  const flattenedData = data?.pages.flatMap((page) => page.projects) || [];

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='flex flex-col gap-8 w-full h-full'>
      {flattenedData.length ? (
        flattenedData.map((item) => (
          <div key={item.projectId}>
            <HubContents {...item} />
          </div>
        ))
      ) : (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}

      {hasNextPage && (
        <div ref={ref} className='h-10 w-full text-center'>
          로딩중...
        </div>
      )}
    </div>
  );
};

export default Hub;
