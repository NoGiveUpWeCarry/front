import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useProjectStore } from '@/store/hubDetailStore';
import { useParams } from 'react-router-dom';
import useHandlePopState from '@/hooks/useHandlePopState';
import { useSearchModal } from '@/store/modals/searchModalstore';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    isError,
  } = useFetchHub(Number(projectId));

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

  // NOTE: 검색 모달 관련 코드
  const { openModal, keyword } = useSearchModal(useShallow((state) => state));
  useHandlePopState(keyword, openModal);

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
      />
    </div>
  );
};

export default ConnectionHubDetail;
