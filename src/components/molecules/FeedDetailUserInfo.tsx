import Icon from '@/components/atoms/Icon';
import { formatDate } from '@/utils/format';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteFeed } from '@/hooks/queries/feed.query';
import PostFeedModal from '@/components/organisms/modals/PostFeedModal';
import usePostModal from '@/hooks/usePostModal';

interface FeedDetailUserInfoProps {
  userId: number;
  userNickname: string;
  userProfileUrl: string;
  userRole: string;
  title: string;
  createdAt: string;
  isWriter: boolean;
  postId: number;
}

const FeedDetailUserInfo = ({
  userNickname,
  userProfileUrl,
  userRole,
  title,
  createdAt,
  isWriter,
  postId,
}: FeedDetailUserInfoProps) => {
  const { isModalOpen, setIsSubmitted, openPostModal, closePostModal } =
    usePostModal();
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: deleteFeed } = useDeleteFeed();
  const handleDelete = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteFeed(postId, {
        onSuccess: () => {
          console.log('피드 삭제 성공');
          navigate('/');
        },
        onError: (error) => {
          console.error('피드 삭제 실패:', error);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='w-fit h-[40px] flex gap-[10px]'>
        <img
          src={userProfileUrl}
          alt='/src/assets/logos/PAD.svg'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='flex flex-col justify-between'>
          <div className='flex text-caption1'>
            <p className='font-medium'>{userNickname}</p>
            <p>님의 &nbsp;</p>
            <p className='font-medium'>{title}</p>
          </div>
          <div className='text-caption1 flex'>
            <p className='font-medium'>{userRole}&nbsp;&nbsp;</p>
            <span>&#183;</span>
            <p className='font-medium'>
              &nbsp;&nbsp;{formatDate(createdAt)}일전
            </p>
          </div>
        </div>
      </div>
      {isWriter && (
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
        <PostFeedModal
          onClose={closePostModal}
          onSubmit={() => setIsSubmitted(true)}
          onRevise={true}
        />
      )}
    </div>
  );
};

export default FeedDetailUserInfo;
