import { useParams } from 'react-router-dom';
import { useChangeHubStatus } from '@/hooks/queries/hub.query';
import { useProjectStore } from '@/store/hubDetailStore';
import { useFetchHub } from '@/hooks/queries/hub.query';
import SideBarApplicantList from '@/components/organisms/sides/SideBarApplicantList';

const HubApplySideBar = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const mutation = useChangeHubStatus();
  const hubStatus = useProjectStore((state) => state.project?.status);
  const { refetch } = useFetchHub(Number(projectId));

  const handleCloseRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }

    const isConfirmed = window.confirm('정말 마감하시겠습니까?');
    if (!isConfirmed) return;

    mutation.mutate(
      {
        projectId: Number(projectId),
        recruiting: false,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleOpenRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }

    const isConfirmed = window.confirm('정말 모집을 다시 오픈하시겠습니까?');
    if (!isConfirmed) return;

    mutation.mutate(
      {
        projectId: Number(projectId),
        recruiting: true,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className='flex w-full flex-col gap-[20px]'>
      <div className='flex w-full flex-col gap-[10px]'>
        <div className='text-[16px] lg:text-[14px] font-medium text-black'>
          👥 지원자 목록
        </div>
        <SideBarApplicantList key={projectId} />
      </div>
      <div className='flex gap-[10px]'>
        {hubStatus === 'OPEN' && (
          <button
            onClick={handleCloseRecruitment}
            className='bg-gradient-to-r from-[#FF8800] to-[#FFA9BE] w-full lg:w-[314px] h-[50px] rounded-md text-white'
          >
            마감
          </button>
        )}

        {hubStatus === 'CLOSED' && (
          <button
            onClick={handleOpenRecruitment}
            className='bg-gradient-to-r from-[#000000] to-[#ffffff] w-full lg:w-[314px] h-[50px] rounded-md text-white'
          >
            오픈
          </button>
        )}
      </div>
    </div>
  );
};

export default HubApplySideBar;
