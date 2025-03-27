import { formatDateFromNow } from '@/utils/format';

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
    // 작은 모바일 화면에서 role 숨김 처리
    <div className='flex items-start gap-1 sm:gap-3'>
      <div className='flex items-center'>
        <span className='text-gray-900 font-semibold text-sm'>
          {userNickname}
        </span>
      </div>
      {!hideRole && (
        <div className='flex items-centergap-[2px]'>
          <span className='text-slate-600 text-sm hidden sm:display-block'>
            {userRole}
          </span>
          <span className='text-slate-700 bg-gray-200 rounded-full text-sm'>
            •
          </span>
          <span className='text-slate-700 text-sm'>
            {formatDateFromNow(createdAt)}
          </span>
        </div>
      )}
    </div>
  );
};

export default FeedContentsUserTitle;
