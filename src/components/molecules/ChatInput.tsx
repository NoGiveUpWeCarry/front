import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import Avatar from '@/components/atoms/Avatar';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  userImage: string;
  isPending: boolean;
  isLoggedIn: boolean;
}

const ChatInput = ({
  onSubmit,
  userImage,
  isPending,
  isLoggedIn,
}: CommentInputProps) => {
  const [comment, setComment] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onSubmit(comment);
    setComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const checkLoggedIn = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.location.href = '/login';
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='w-full h-[40px] flex gap-[10px] mb-[20px]'>
        <Avatar
          src={userImage}
          alt='User Avatar'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='w-full bg-lightgray px-[20px] py-2 rounded-full flex items-center'>
          <input
            className='w-full bg-lightgray focus:outline-none'
            placeholder='내용을 입력해주세요.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending}
            onClick={checkLoggedIn}
            onKeyDown={handleKeyDown}
          />
          <div
            className='absolute left-[713px] bg-white w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer'
            onClick={handleSubmit}
          >
            <Icon type='arrowLongUp' className='w-[20px] h-[20px]' />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmModal
          message='로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?'
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ChatInput;
