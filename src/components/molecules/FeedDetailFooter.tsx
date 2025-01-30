import Icon from '@/components/atoms/Icon';

interface FeedDetailFooterProps {
  commentCount: number;
  likeCount: number;
  viewCount: number;
}

const FeedDetailFooter = ({
  commentCount,
  likeCount,
  viewCount,
}: FeedDetailFooterProps) => {
  return (
    <div className='fixed bottom-[10px] bg-[#4B4B4B] ml-[20px] w-[760px] h-[40px] rounded-[10px] py-[10px] px-[200px] flex text-white text-heading2'>
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <Icon
            type='chatBubbleOvalLeftEllipsis'
            className='w-[24px] h-[24px] text-white'
          />
          &nbsp;
          {commentCount}
        </div>
        <div className='flex'>
          <Icon type='like' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {likeCount}
        </div>
        <div className='flex'>
          <Icon type='eye' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {viewCount}
        </div>
      </div>
    </div>
  );
};

export default FeedDetailFooter;
