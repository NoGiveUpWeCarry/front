import formatTimeAgo from '@/utils/\bformatTimeAgo';

interface ContentsUserTitleProps {
  userNickname: string;
  userRole: string;
  createdAt: string;
}

const calculateTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

const ContentsUserTitle = ({
  userNickname,
  userRole,
  createdAt,
}: ContentsUserTitleProps) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='font-bold text-gray-900 text-sm'>{userNickname}</span>
      <div className='flex items-center gap-[2px]'>
        <span className='text-gray-500 text-sm'>{userRole}</span>
        <span className='text-black bg-gray-500 rounded-full'>•</span>
        <span className='text-gray-400 text-sm'>
          {formatTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ContentsUserTitle;
