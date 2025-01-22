import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ChatItemProps {
  chat: {
    commentId: number;
    userProfileUrl: string;
    userName: string;
    userRole: string;
    comment: string;
    isLiked: boolean;
    likeCount: number;
    userId: number;
  };
  isCurrentUser: boolean;
  onDelete: (commentId: number) => void;
}

const ChatItem = ({ chat, isCurrentUser, onDelete }: ChatItemProps) => {
  return (
    <div
      className={clsx('flex gap-2', {
        'flex-row-reverse': isCurrentUser,
      })}
    >
      <img
        src={chat.userProfileUrl}
        alt={chat.userName}
        className='w-[40px] h-[40px] rounded-full'
      />
      <div
        className={clsx('flex flex-col gap-1', {
          'items-end': isCurrentUser,
        })}
      >
        <div className='flex gap-[10px] items-center'>
          <p className='text-body font-semibold'>{chat.userName}</p>
          <p className='text-caption2 text-gray'>{chat.userRole}</p>
        </div>
        <div className='px-2 py-1 rounded-[10px] max-w-96 flex-wrap bg-[#EAFBFF]'>
          {chat.comment}
        </div>
      </div>

      <div className='flex flex-col-reverse justify-between items-center'>
        <div className='flex items-center gap-1'>
          {isCurrentUser && (
            <div className='flex gap-2 text-gray bg-white h-[16px] px-1 rounded-[5px]'>
              <button className='hover:underline text-caption2'>수정</button>
              <button
                className='hover:underline text-caption2'
                onClick={() => onDelete(chat.commentId)}
              >
                삭제
              </button>
            </div>
          )}
          <HandThumbUpIcon
            className={clsx('w-4 h-4 cursor-pointer', {
              'text-red-400': chat.isLiked,
              'text-gray': !chat.isLiked,
            })}
          />
          <div className='text-xs text-gray'>{chat.likeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
