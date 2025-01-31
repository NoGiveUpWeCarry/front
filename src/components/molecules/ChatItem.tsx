import { useState } from 'react';
import { usePatchFeedChat, usePutChatLike } from '@/hooks/queries/feed.query';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import notifyToast from '@/utils/notifyToast';
import Avatar from '@/components/atoms/Avatar';

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
  const { id: postId } = useParams<{ id: string }>();
  const { mutate: toggleLike } = usePutChatLike();
  const { mutate: patchComment } = usePatchFeedChat();

  const [isLiked, setIsLiked] = useState(chat.isLiked);
  const [likeCount, setLikeCount] = useState(chat.likeCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(chat.comment);

  const handleLikeClick = () => {
    if (isLoading) return;
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);
    toggleLike(
      { id: chat.commentId },
      {
        onSuccess: () => {
          console.log(`댓글 ${chat.commentId} 좋아요 상태 변경 성공`);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error(`댓글 ${chat.commentId} 좋아요 상태 변경 실패:`, error);
          setIsLiked((prev) => !prev);
          setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditedComment(chat.comment);
  };

  const handleEditSubmit = () => {
    if (!editedComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (postId) {
      patchComment(
        {
          id: Number(postId),
          commentId: chat.commentId,
          content: editedComment,
        },
        {
          onSuccess: () => {
            notifyToast('댓글 수정 성공');
            setIsEditing(false);
          },
          onError: () => {
            notifyToast('댓글 수정 실패');
          },
        }
      );
    }
  };

  return (
    <div
      className={clsx('flex gap-2', {
        'flex-row-reverse': isCurrentUser,
      })}
    >
      <Avatar
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
        {isEditing ? (
          <div className='flex gap-2 items-center'>
            <input
              className='px-2 py-1 rounded-[10px] bg-[#EAFBFF] max-w-96 w-full focus:outline-none'
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <button
              className='text-sm text-blue-500 hover:underline'
              onClick={handleEditSubmit}
            >
              저장
            </button>
            <button
              className='text-sm text-red-500 hover:underline'
              onClick={handleEditToggle}
            >
              취소
            </button>
          </div>
        ) : (
          <div
            className={clsx(
              'px-2 py-1 rounded-[10px] max-w-96 flex-wrap bg-[#EAFBFF]',
              { 'bg-[#ffdfe7]': isCurrentUser }
            )}
          >
            {chat.comment}
          </div>
        )}
      </div>

      <div className='flex flex-col-reverse justify-between items-center'>
        <div className='flex items-center gap-1'>
          {isCurrentUser && (
            <div className='flex gap-2 text-gray bg-white h-[16px] px-1 rounded-[5px]'>
              {!isEditing && (
                <button
                  className='hover:underline text-caption2'
                  onClick={handleEditToggle}
                >
                  수정
                </button>
              )}
              <button
                className='hover:underline text-caption2'
                onClick={() => onDelete(chat.commentId)}
              >
                삭제
              </button>
            </div>
          )}
          <HandThumbUpIcon
            onClick={handleLikeClick}
            className={clsx('w-4 h-4 cursor-pointer', {
              'text-red-400': isLiked,
              'text-gray': !isLiked,
              'cursor-not-allowed': isLoading,
            })}
          />
          <div className='text-xs text-gray'>{likeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
