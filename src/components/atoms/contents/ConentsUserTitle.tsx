import formatTimeAgo from '@/utils/formatTimeAgo';
interface ContentsUserTitleProps {
  userNickname: string;
  userRole?: string;
  createdAt: string;
}
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
        {createdAt && (
          <>
            <span className='text-black bg-gray-500 rounded-full'>•</span>
            <span className='text-gray-400 text-sm'>
              {formatTimeAgo(createdAt)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentsUserTitle;
