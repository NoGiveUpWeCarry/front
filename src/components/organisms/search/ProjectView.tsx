import { HubContents } from '@/components/organisms/hub/HubContents';
import { useSearchConnectionHub } from '@/hooks/queries/search.query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ProjectView = ({ keyword }: { keyword: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchConnectionHub(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className='text-[14px]'>검색 결과를 가져오는 중 입니다...</div>;
  }

  if (data?.pages[0].projects?.length === 0) {
    return <div className='text-[14px]'>검색 결과가 존재하지 않습니다.</div>;
  }

  return (
    <div className='flex flex-col gap-10'>
      {data?.pages.map((page) =>
        page.projects.map((project) => (
          <HubContents
            key={project.projectId}
            {...project}
            user={{
              profileUrl: project.userProfileUrl,
              nickname: project.userNickname,
              role: project.userRole,
            }}
            createdAt={project.createdAT}
          />
        ))
      )}
      <div ref={ref} className='h-10' />
    </div>
  );
};

export default ProjectView;
