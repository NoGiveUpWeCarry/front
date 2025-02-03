import {
  useApplyCancel,
  useApplyHub,
  useFetchApplyStatus,
  useFetchHub,
} from '@/hooks/queries/hub.query';
import { useProjectStore } from '@/store/hubDetailStore';
import { useParams } from 'react-router-dom';
const HubApplyUserSideBar = () => {
  const hubType = useProjectStore((state) => state.project?.hubType);
  const hubStatus = useProjectStore((state) => state.project?.status);
  const { projectId } = useParams<{ projectId: string }>();
  const applyMutation = useApplyHub();
  const applyCancelMutation = useApplyCancel();
  const { refetch } = useFetchHub(Number(projectId));
  const {
    data: applyStatusData,
    isLoading: isApplyStatusLoading,
    refetch: refetchApplyStatus,
  } = useFetchApplyStatus(Number(projectId));
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
          refetchApplyStatus();
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
          refetchApplyStatus();
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
            hubStatus === 'CLOSED'
              ? 'bg-gradient-to-r from-[#555555] to-[#777777] cursor-not-allowed'
              : isApplied
                ? 'bg-gradient-to-r from-[#000000] to-[#FFFFFF] cursor-pointer'
                : 'bg-gradient-to-r from-[#FF8800] to-[#84FF74]'
          }`}
          disabled={isApplyStatusLoading || hubStatus === 'CLOSED'}
        >
          {hubStatus === 'CLOSED'
            ? '마감'
            : isApplyStatusLoading
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
            hubStatus === 'CLOSED'
              ? 'bg-gradient-to-r from-[#000000] to-[#777777] cursor-not-allowed'
              : isApplied
                ? 'bg-gradient-to-r from-[#000000] to-[#FFFFFF] cursor-pointer'
                : 'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE]'
          }`}
          disabled={isApplyStatusLoading || hubStatus === 'CLOSED'}
        >
          {hubStatus === 'CLOSED'
            ? '마감'
            : isApplyStatusLoading
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
