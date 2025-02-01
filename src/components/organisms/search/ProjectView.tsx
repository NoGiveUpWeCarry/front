import { RoleProps } from '@/components/atoms/Role';
import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import { useSearchConnectionHub } from '@/hooks/queries/search.query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ProjectView = ({ keyword }: { keyword: string }) => {
  const { ref, inView } = useInView();

  const {
    data: hubs,
    isLoading: isProjectsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSearchConnectionHub(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isProjectsLoading) {
    return <div className='text-[14px]'>검색 결과를 가져오는 중 입니다...</div>;
  }

  if (hubs?.pages[0].posts?.length === 0) {
    return <div className='text-[14px]'>검색 결과가 존재하지 않습니다.</div>;
  }

  return (
    <div className='flex flex-col gap-10'>
      {hubs?.pages[0].projects?.map((project) => (
        <Link to={`/projects/${project.projectId}`}>
          <HubContents
            key={project.projectId}
            {...project}
            user={{
              profileUrl: project.userProfileUrl,
              nickname: project.userNickname,
              role: project.userRole,
            }}
            title={project.title}
            workType={project.workType === '온라인' ? 'ONLINE' : 'OFFLINE'}
            hubType={project.hubType === '프로젝트' ? 'PROJECT' : 'OUTSOURCING'}
            detailRoles={project.detailRoles as roleTagItemsKey[]}
            role={project.role as RoleProps['role']}
            status={project.status as statusTagItemskey}
          />
        </Link>
      ))}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default ProjectView;
