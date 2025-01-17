import { Comment } from '@/apis/feed';
import useAuthStore from '@/store/authStore';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const FeedDetailChat = () => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  console.log('userId: ' + userId);
  const comments: Comment[] = Array.from({ length: 20 }, (_, index) => ({
    commentId: index + 1,
    userId: (index % 7) + 1,
    userName: `User ${index + 1}`,
    userRole: ['Admin', 'User', 'Moderator', 'Guest', 'Viewer'][index % 5],
    userProfileUrl: `data:image/jpeg;base64,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`,
    comment: `이 토론 정말 흥미롭네요! (댓글 ${index + 1})`,
    createdAt: new Date(),
    likeCount: Math.floor(Math.random() * 10),
    isLiked: index % 2 === 0,
  }));

  console.log(comments);

  const groupCommentsByDate = (comments: Comment[]) => {
    const grouped = comments.reduce(
      (acc, comment) => {
        const dateKey = comment.createdAt.toISOString().split('T')[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(comment);
        return acc;
      },
      {} as Record<string, Comment[]>
    );
    return Object.entries(grouped).map(([date, comments]) => ({
      date,
      comments,
    }));
  };
  const groupedComments = groupCommentsByDate(comments);

  return (
    <div className='flex flex-col gap-[20px] mt-3 w-full h-[800px] bg-blue-500'>
      <div className='bg-lightgray w-full h-[530px] rounded-[20px] overflow-y-auto p-4'>
        {groupedComments.map(({ date, comments }) => (
          <div key={date} className='mb-4'>
            <h3 className='text-caption1 text-gray font-bold mb-2 flex justify-center'>
              {date}
            </h3>
            {comments.map((chat) => (
              <div
                key={chat.commentId}
                className={clsx('flex gap-2', {
                  'flex-row-reverse': userId === chat.userId,
                })}
              >
                <img
                  src={chat.userProfileUrl}
                  alt={chat.userName}
                  className='w-[40px] h-[40px] rounded-full'
                />
                <div
                  className={clsx('flex flex-col', {
                    'items-end': userId === chat.userId,
                  })}
                >
                  <div className='flex gap-[10px] items-center'>
                    <p className='text-body font-semibold'>{chat.userName}</p>
                    <p className='text-caption2 text-gray'>{chat.userRole}</p>
                  </div>
                  <div
                    className={clsx(
                      'px-2 py-2 rounded-[5px] max-w-96 flex-wrap',
                      userId === chat.userId ? 'bg-[#D1F2EB]' : 'bg-[#EAFBFF]'
                    )}
                  >
                    {chat.comment}
                  </div>
                  {userId === chat.userId && (
                    <div className='flex gap-2 text-gray text-sm mt-1'>
                      <button className='hover:underline'>수정</button>
                      <button className='hover:underline'>삭제</button>
                    </div>
                  )}
                </div>
                <div className='flex flex-col justify-between items-center'>
                  <div className='flex items-center gap-1'>
                    <HandThumbUpIcon
                      className={clsx('w-4 h-4', {
                        'text-red-500': chat.isLiked,
                        'text-gray': !chat.isLiked,
                      })}
                    />
                    <div className='text-xs text-gray'>{chat.likeCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedDetailChat;
