import {
  applyCancel,
  applyHub,
  useFetchApplyStatus,
  useFetchHub,
} from '@/hooks/queries/hub.query';
import { useProjectStore } from '@/store/hubDetailStore';
import { useParams } from 'react-router-dom';

const HubApplyUserSideBar = () => {
  const hubType = useProjectStore((state) => state.project?.hubType);
  const { projectId } = useParams<{ projectId: string }>();
  const applyMutation = applyHub();
  const applyCancelMutation = applyCancel();
  const { refetch } = useFetchHub(Number(projectId));
  const { data: applyStatusData, isLoading: isApplyStatusLoading } =
    useFetchApplyStatus(Number(projectId));
  const isApplied = applyStatusData?.status === 'applied';

  const handleApply = () => {
    if (!projectId) {
      console.error('Project Id 가 없습니다!');
      return;
    }

    const isConfirmed = window.confirm('정말 지원하시겠습니까?');
    if (!isConfirmed) return;

    applyMutation.mutate(
      {
        projectId: Number(projectId),
      },
      {
        onSuccess: () => {
          refetch();
          window.setTimeout(() => {
            window.location.reload();
          }, 100);
        },
      }
    );
  };

  const handleCancelApply = () => {
    if (!projectId) {
      console.error('Project Id 가 없습니다!');
      return;
    }

    const isConfirmed = window.confirm('정말 취소하시겠습니까?');
    if (!isConfirmed) return;

    applyCancelMutation.mutate(
      {
        projectId: Number(projectId),
      },
      {
        onSuccess: () => {
          refetch();
          window.setTimeout(() => {
            window.location.reload();
          }, 100);
        },
      }
    );
  };

  return (
    <div className='flex w-full'>
      {hubType === 'OUTSOURCING' && (
        <button
          onClick={isApplied ? handleCancelApply : handleApply}
          className={`w-[314px] h-[50px] rounded-md text-white ${
            isApplied
              ? 'bg-gradient-to-r from-[#000000] to-[#ffffff] cursor-pointer'
              : 'bg-gradient-to-r from-[#FF8800] to-[#84FF74]'
          }`}
          disabled={isApplyStatusLoading}
        >
          {isApplyStatusLoading
            ? '로딩 중...'
            : isApplied
              ? '지원 취소'
              : '지원'}
        </button>
      )}
      {hubType === 'PROJECT' && (
        <button
          onClick={isApplied ? handleCancelApply : handleApply}
          className={`w-[314px] h-[50px] rounded-md text-white ${
            isApplied
              ? 'bg-gradient-to-r from-[#000000] to-[#ffffff] cursor-pointer'
              : 'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE]'
          }`}
          disabled={isApplyStatusLoading}
        >
          {isApplyStatusLoading
            ? '로딩 중...'
            : isApplied
              ? '지원 취소'
              : '지원'}
        </button>
      )}
    </div>
  );
};

export default HubApplyUserSideBar;
