import Avatar from '@/components/atoms/Avatar';
import {
  applicantsStatus,
  useFetchApplicants,
} from '@/hooks/queries/hub.query';
import { useParams } from 'react-router-dom';

const SideBarApplicantList = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ApplicantData,
    isLoading: ApplicantLoading,
    isError,
    refetch,
  } = useFetchApplicants(Number(projectId));

  const changeStatusMutation = applicantsStatus();

  const handleStatusChange = (
    userId: number,
    status: 'Accepted' | 'Rejected'
  ) => {
    if (
      !window.confirm(
        `정말 ${status === 'Accepted' ? '수락' : '거절'}하시겠습니까?`
      )
    )
      return;

    changeStatusMutation.mutate(
      { projectId: Number(projectId), userId, status },
      {
        onSuccess: () => {
          refetch(); // ✅ 상태 변경 후 지원자 목록 갱신
        },
      }
    );
  };

  if (ApplicantLoading) {
    return <div className='text-center text-gray-500'>지원자 로딩 중...</div>;
  }

  if (isError || !ApplicantData?.applicants.length) {
    return <div className='text-center text-gray-500'>지원자가 없습니다.</div>;
  }

  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'>
      {ApplicantData.applicants.map((applicant, index) => (
        <div
          key={applicant.userId}
          className='flex items-center justify-between'
        >
          <div className='flex items-center gap-[10px]'>
            <div className='text-[14px]'>{index + 1}</div>
            <Avatar
              src={applicant.profileUrl}
              alt={applicant.nickname}
              size='xxs'
            />
            <div className='text-[14px] font-medium'>{applicant.nickname}</div>
          </div>
          <div className='flex gap-[10px]'>
            {/* ✅ 상태에 따라 버튼 또는 상태 표시 */}
            {applicant.status === 'Pending' ? (
              <>
                <button
                  onClick={() =>
                    handleStatusChange(applicant.userId, 'Accepted')
                  }
                  className='w-[45px] h-[30px] text-[12px] bg-[#00C859] text-white rounded'
                >
                  수락
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(applicant.userId, 'Rejected')
                  }
                  className='w-[45px] h-[30px] text-[12px] bg-[#FF5E5E] text-white rounded'
                >
                  거절
                </button>
              </>
            ) : (
              <div className='text-[12px] font-medium'>
                {applicant.status === 'Accepted' ? '✅ 수락됨' : '❌ 거절됨'}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarApplicantList;
