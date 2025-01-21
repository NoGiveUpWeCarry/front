import clsx from 'clsx';
import useAuthStore from '@/store/authStore';
import groupCommentsByDate from '@/utils/groupCommentsByDate';
import ChatItem from '@/components/molecules/ChatItem';
import { Comment } from '@/apis/feed';
import { useDeleteFeedChat, usePostFeedChat } from '@/hooks/queries/feed.query';
import ChatInput from '@/components/molecules/ChatInput';

interface FeedDetailChatProps {
  comments: Comment[];
  feedId: number;
}

const FeedDetailChat = ({ comments, feedId }: FeedDetailChatProps) => {
  const { userId, userImage } = useAuthStore((state) => state.userInfo);
  const groupedComments = groupCommentsByDate(comments);
  const { mutate: postComment, isPending } = usePostFeedChat();
  const { mutate: deleteComment } = useDeleteFeedChat();

  const submitComment = (content: string) => {
    postComment(
      { id: feedId, content },
      {
        onSuccess: () => {
          console.log('댓글 작성 성공');
        },
        onError: (error) => {
          console.error('댓글 작성 실패:', error);
          alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  const handleDeleteComment = (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }
    deleteComment(
      { postId: feedId, commentId },
      {
        onSuccess: () => {
          console.log('댓글 삭제 성공');
        },
        onError: (error) => {
          console.error('댓글 삭제 실패:', error);
          alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <div className='mt-3 w-full h-fit flex flex-col gap-[20px] px-[30px]'>
      {groupedComments && groupedComments.length > 0 ? (
        <div
          className={clsx(
            'relative bg-lightgray w-full h-[600px] rounded-[20px] overflow-hidden p-4'
          )}
        >
          <div
            className={clsx('w-full h-full overflow-y-auto p-2', 'scroll-pr-4')}
          >
            {groupedComments.map(({ date, comments }) => (
              <div key={date} className='mb-4 flex flex-col gap-[20px]'>
                <h3 className='text-caption1 text-gray font-bold mb-2 flex justify-center'>
                  {date}
                </h3>
                {comments.map((chat) => (
                  <ChatItem
                    key={chat.commentId}
                    chat={chat}
                    isCurrentUser={userId === chat.userId}
                    onDelete={() => handleDeleteComment(chat.commentId)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='w-full h-[30px]' />
      )}
      <ChatInput
        onSubmit={submitComment}
        userImage={userImage}
        isPending={isPending}
      />
    </div>
  );
};

export default FeedDetailChat;
