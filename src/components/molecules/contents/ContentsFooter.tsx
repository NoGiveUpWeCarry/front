import Icon from '@/components/atoms/Icon';

interface FeedFooterProps {
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
}

interface HubFooterProps {
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
}

export const FeedFooter = ({
  commentsCount,
  likesCount,
  viewsCount,
}: FeedFooterProps) => {
  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div className='flex items-center space-x-1'>
        <Icon type='comment' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{commentsCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='like' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{likesCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewsCount}</span>
      </div>
    </div>
  );
};

export const HubFooter = ({
  bookmarkCount,
  userCount,
  viewsCount,
}: HubFooterProps) => {
  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div className='flex items-center space-x-1'>
        <Icon type='bookmark' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{bookmarkCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='user' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{userCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewsCount}</span>
      </div>
    </div>
  );
};
