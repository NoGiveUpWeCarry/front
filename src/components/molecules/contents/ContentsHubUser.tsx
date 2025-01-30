import Avatar from '@/components/atoms/Avatar';
import ContentsHubUserTitle from '@/components/atoms/contents/ContentsHubUserTitle';
import Icon from '@/components/atoms/Icon';
import PostHubModal from '@/components/organisms/modals/PostHubModal';
import { useDeleteHub } from '@/hooks/queries/hub.query';
import usePostHubModal from '@/hooks/usePostHubModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContentsUserProps {
  profileUrl: string;
  createdAt: string;
  nickname: string;
  role?: string;
  isOwnConnectionHub?: boolean;
  projectId: number;
}

const ContentsHubUser = ({
  createdAt,
  nickname,
  role,
  profileUrl,
  isOwnConnectionHub,
  projectId,
}: ContentsUserProps) => {
  const { isModalOpen, setIsSubmitted, openPostModal, closePostModal } =
    usePostHubModal();
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: deleteHub } = useDeleteHub();
  const handleDelete = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니다?');
    if (confirmDelete) {
      deleteHub(projectId, {
        onSuccess: () => {
          console.log('허브 삭제 성공');
          navigate('/projects');
        },
        onError: (error) => {
          console.log('허브 삭제 실패: ', error);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };
  return (
    <div className='flex items-center w-full justify-between'>
      <div className='flex space-x-3'>
        <Avatar src={profileUrl} size='xs' alt={`${nickname} Avatar`} />
        <ContentsHubUserTitle
          nickname={nickname}
          role={role}
          createdAt={createdAt}
        />
      </div>
      {isOwnConnectionHub && (
        <div className='relative'>
          <div className='cursor-pointer' onClick={() => setClicked(!clicked)}>
            <Icon
              type='EllipsisHorizontalCircle'
              className='text-gray w-[24px] h-[24px]'
            />
          </div>
          {clicked && (
            <div className='absolute w-[80px] h-fit top-[120%] left-[-30px] z-50'>
              <div className='flex flex-col gap-3 text-gray bg-white px-[20px] py-[10px] rounded-[20px] shadow-md'>
                <button
                  className='hover:underline text-caption1 w-full text-gray flex gap-1 items-center'
                  onClick={openPostModal}
                >
                  <Icon
                    type='pencilSquare'
                    className='w-[14px] h-[14px] text-gray'
                  />
                  <p>수정</p>
                </button>
                <button
                  className='hover:underline text-caption1 w-full items-center h-fit text-gray flex gap-1'
                  onClick={handleDelete}
                >
                  <Icon type='trash' className='w-[14px] h-[14px] text-gray' />
                  <p>삭제</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {isModalOpen && (
        <PostHubModal
          onClose={closePostModal}
          onSubmit={() => setIsSubmitted(true)}
          onRevise={true}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default ContentsHubUser;
