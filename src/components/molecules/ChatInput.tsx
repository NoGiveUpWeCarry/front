import { useState } from 'react';
import Icon from '@/components/atoms/Icon';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  userImage: string;
  isPending: boolean;
}

const ChatInput = ({ onSubmit, userImage, isPending }: CommentInputProps) => {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className='w-full h-[40px] flex gap-[10px] mb-[40px]'>
      <img
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
        />
        <div
          className='absolute left-[730px] bg-white w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer'
          onClick={handleSubmit}
        >
          <Icon type='arrowLongUp' className='w-[20px] h-[20px]' />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
