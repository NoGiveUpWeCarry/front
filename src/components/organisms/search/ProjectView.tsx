import { RoleProps } from '@/components/atoms/Role';
import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
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

  return isProjectsLoading ? (
    <div>검색 결과를 가져오는 중 입니다...</div>
  ) : (
    <div className='flex flex-col gap-10'>
      {hubs?.pages[0].projects?.map((project) => (
        <Link to={`/connectionhub/${project.projectId}`}>
          <HubContents
            key={project.projectId}
            {...project}
            user={{
              userProfileUrl: project.userProfileUrl,
              userNickname: project.userNickname,
              userRole: project.userRole,
              createdAt: project.createdAt,
            }}
            title={project.title}
            meetingTags={project.workType as meetingTagItemskey}
            statusTags={project.status as statusTagItemskey}
            hubTags={project.hubType as HubTagItemsKey}
            roleTags={
              (project.detailRoles || project.skills) as roleTagItemsKey[]
            }
            role={project.role as RoleProps['role']}
            bookmarkCount={project.bookMarkCount}
            userCount={project.applyCount}
            viewsCount={project.viewCount}
            thumbnailUrl={project.userProfileUrl}
          />
        </Link>
      ))}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default ProjectView;
