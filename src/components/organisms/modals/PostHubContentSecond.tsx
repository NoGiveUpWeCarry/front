import { useEffect, useState } from 'react';
import { HubState } from '@/store/postHubStore';
import useHubStore from '@/store/postHubStore';
import {
  useInfiniteFetchHubs,
  usePostHub,
  usePutHub,
} from '@/hooks/queries/hub.query';
import TiptapHubEditor from '@/components/organisms/TiptapHubEditor';
import useHubSearchStore from '@/store/hubSeartchStore';

interface PostHubContentSecondProps {
  onPrevious: () => void;
  onSubmit: (...arg: any) => void;
  onRevise: boolean;
  projectId?: number;
}

const PostHubContentSecond = ({
  onPrevious,
  onRevise,
  projectId,
  onSubmit,
}: PostHubContentSecondProps) => {
  const {
    content,
    setContent,
    title,
    role,
    hubType,
    startDate,
    duration,
    workType,
    skills,
    detailRoles,
  } = useHubStore();
  const { mutate: postHub } = usePostHub();
  const { mutate: putHub } = usePutHub();
  const { resetHub } = useHubStore();
  const { sort, role: filterRole, unit } = useHubSearchStore();

  const { refetch } = useInfiniteFetchHubs(sort, filterRole, unit);
  const [hubContent, setHubContent] = useState<Pick<HubState, 'content'>>({
    content: '',
  });

  useEffect(() => {
    setHubContent({ content });
  }, [content]);

  const handleSaveContent = () => {
    const confirmMessage = onRevise
      ? '수정을 완료하시겠습니까?'
      : '작성을 완료하시겠습니까?';

    if (!window.confirm(confirmMessage)) {
      return; // 사용자가 취소하면 종료
    }

    setContent(hubContent.content);

    const data = {
      title,
      content: hubContent.content,
      role,
      hub_type: hubType,
      start_date: startDate,
      duration,
      work_type: workType,
      recruiting: true,
      skills,
      detail_roles: detailRoles,
    };

    if (onRevise) {
      if (projectId === undefined) {
        alert('프로젝트 ID가 없습니다. 수정할 수 없습니다.');
        return;
      }

      // 수정 로직
      putHub(
        {
          projectId,
          ...data,
        },
        {
          onSuccess: () => {
            alert('허브 수정이 완료되었습니다.');
            resetHub();
            onSubmit();
          },
          onError: (error) => {
            console.error('허브 수정 중 오류 발생:', error);
            alert('수정에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    } else {
      // 생성 로직
      postHub(data, {
        onSuccess: () => {
          alert('허브 생성이 완료되었습니다.');
          resetHub();
          refetch();
          onSubmit();
        },
        onError: (error) => {
          console.error('허브 생성 중 오류 발생:', error);
          alert('생성에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };
  return (
    <div className='flex flex-col items-start w-full h-full gap-[10px]'>
      <div className='flex text-[20px] font-semibold'>허브 소개</div>
      <div className='flex flex-col w-full px-[10px] py-[20px] h-[573px] overflow-y-scroll scrollbar-hide border rounded-md border-black'>
        <TiptapHubEditor
          content={hubContent.content}
          setContent={(value) => setHubContent({ content: value })}
        />
      </div>
      <div className='flex w-full justify-end gap-[10px]'>
        <button
          className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'
          onClick={onPrevious}
        >
          이전
        </button>
        <button
          className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
          onClick={handleSaveContent}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PostHubContentSecond;
