import { useEffect, useState } from 'react';
import { HubState } from '@/store/postHubStore';
import useHubStore from '@/store/postHubStore';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import { usePostHub } from '@/hooks/queries/hub.query';

interface PostHubContentSecondProps {
  onPrevious: () => void;
  onClose: () => void;
}

const PostHubContentSecond = ({
  onPrevious,
  onClose,
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
  const { resetHub } = useHubStore();

  const [hubContent, setHubContent] = useState<Pick<HubState, 'content'>>({
    content: '',
  });

  useEffect(() => {
    setHubContent({ content });
  }, [content]);

  const handleSaveContent = () => {
    setContent(hubContent.content);
    if (window.confirm('작성을 완료하시겠습니까?')) {
      postHub({
        title,
        content: hubContent.content,
        role,
        hub_type: hubType,
        start_date: startDate,
        duration,
        work_type: workType,
        recruiting: false,
        skills,
        detail_roles: detailRoles,
      });
      resetHub();
      onClose();
    }
  };

  return (
    <div className='flex flex-col items-start w-full h-full gap-[10px]'>
      <div className='flex text-[20px] font-semibold'>허브 소개</div>
      <div className='flex flex-col w-full px-[10px] py-[20px] h-[573px] overflow-y-scroll scrollbar-hide border rounded-md border-black'>
        <TiptapEditor
          content={hubContent.content}
          setContent={(value) => setHubContent({ content: value })}
        />
      </div>
      <div className='flex w-full justify-end'>
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
