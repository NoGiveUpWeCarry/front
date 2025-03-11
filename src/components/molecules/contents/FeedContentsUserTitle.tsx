import formatTimeAgo from '@/utils/formatTimeAgo';

interface FeedContentsUserTitleProps {
  userNickname: string;
  userRole: string;
  createdAt: string;
  hideRole?: boolean;
}
const FeedContentsUserTitle = ({
  userNickname,
  userRole,
  createdAt,
  hideRole,
}: FeedContentsUserTitleProps) => {
  return (
    <div className='flex items-start gap-3'>
      <div className='flex items-center'>
        <span className='text-gray-900 font-semibold text-sm'>
          {userNickname}
        </span>
      </div>
      {!hideRole && (
        <div className='flex items-center gap-[2px]'>
          <span className='text-slate-600 text-sm'>{userRole}</span>
          <span className='text-slate-700 bg-gray-200 rounded-full text-sm'>
            •
          </span>
          <span className='text-slate-700 text-sm'>
            {formatTimeAgo(createdAt)}
          </span>
        </div>
      )}
    </div>
  );
};

export default FeedContentsUserTitle;
