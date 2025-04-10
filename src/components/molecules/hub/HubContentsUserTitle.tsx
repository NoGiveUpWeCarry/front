import { formatDateFromNow } from '@/utils/format';
interface ContentsUserTitleProps {
  nickname: string;
  role?: string;
  createdAt: string;
}

const HubContentsUserTitle = ({
  nickname,
  role,
  createdAt,
}: ContentsUserTitleProps) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='font-bold text-gray-900 text-sm'>{nickname}</span>
      <div className='flex justify-center items-center gap-[2px]'>
        <span className='text-gray-500 text-sm'>{role}</span>
        <span>•</span>
        <span className='text-gray-400 text-sm'>
          {formatDateFromNow(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default HubContentsUserTitle;
