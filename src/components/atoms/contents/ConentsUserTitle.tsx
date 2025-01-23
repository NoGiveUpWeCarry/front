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
      <span className='font-medium text-gray-900 text-sm'>{userNickname}</span>
      <div className='flex items-center gap-[5px]'>
        <span className='felx font-normal text-black text-sm'>{userRole}</span>
        <span className='text-black bg-gray-500 rounded-full'>•</span>
        <span className='text-black text-sm'>
          {calculateTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ContentsUserTitle;
