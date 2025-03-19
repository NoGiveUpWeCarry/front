import { FormEvent, useState } from 'react';
import Icon from '@/components/atoms/Icon';
import Avatar from '@/components/atoms/Avatar';
import useAuthStore from '@/store/authStore';
import { useShallow } from 'zustand/shallow';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  userImage: string;
  isPending: boolean;
}

const ChatInput = ({ onSubmit, userImage, isPending }: CommentInputProps) => {
  const [comment, setComment] = useState<string>('');
  const { isLoggedIn } = useAuthStore(useShallow((state) => state));

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onSubmit(comment);
    setComment('');
  };

  return (
    <>
      <div className='w-full h-[40px] flex gap-[10px] mb-20'>
        <Avatar
          src={userImage || undefined}
          alt='User Avatar'
          className='w-[40px] h-[40px] rounded-full'
        />
        <form
          className='w-full bg-lightgray px-3 py-2 rounded-xl flex items-center justify-between'
          onSubmit={submitHandler}
        >
          <input
            className='w-full bg-lightgray focus:outline-none'
            placeholder='내용을 입력해주세요.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending || !isLoggedIn}
          />
          <button
            className='bg-white w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer border'
            type='submit'
          >
            <Icon type='arrowLongUp' className='w-[20px] h-[20px]' />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
