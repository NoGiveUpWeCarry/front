import { useFetchHub } from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useProjectStore } from '@/store/hubDetailStore';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import HubDetail from '@/components/organisms/hub/HubDetail';
import { useSearchModal } from '@/store/modals/searchModalstore';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    isError,
  } = useFetchHub(Number(projectId));

  // 검색 관련 코드
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { keyword: searchKeyword } = useSearchModal();

  useEffect(() => {
    if (query.get('from') === 'search') {
      const handlePopState = () => {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.includes('q=')
          ? currentUrl
          : `${currentUrl}?q=${searchKeyword}`;
        window.history.pushState(null, '', newUrl);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [location]);

  const setProject = useProjectStore((state) => state.setProject);
  const isOwnConnectionHub = useProjectStore(
    (state) => state.isOwnConnectionHub
  );
  const currentUserId = useAuthStore((state) => state.userInfo.userId);

  useEffect(() => {
    setProject(null, currentUserId);
  }, [projectId, setProject, currentUserId]);

  useEffect(() => {
    if (ProjectData?.project) {
      setProject(ProjectData.project, currentUserId);
    }
  }, [ProjectData, currentUserId, setProject]);

  if (ProjectLoading) {
    return <div>피드 로딩 중...</div>;
  }

  if (isError || !ProjectData?.project) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className='flex p-10px'>
      <HubDetail
        title={ProjectData.project.title}
        hubType={ProjectData.project.hubType}
        workType={ProjectData.project.workType}
        status={ProjectData.project.status}
        detailRoles={ProjectData.project.detailRoles}
        skills={ProjectData.project.skills}
        role={ProjectData.project.role}
        startDate={ProjectData.project.startDate}
        duration={ProjectData.project.duration}
        content={ProjectData.project.content}
        createdAt={ProjectData.project.createdAt}
        manager={ProjectData.project.manager}
        projectId={ProjectData.project.projectId}
        isOwnConnectionHub={isOwnConnectionHub}
        bookmarkCount={ProjectData.project.bookmarkCount}
        applyCount={ProjectData.project.applyCount}
        viewCount={ProjectData.project.viewCount}
      />
    </div>
  );
};

export default ConnectionHubDetail;
