import { Skeleton } from '@radix-ui/themes';

const FeedDetailSkeleton = () => {
  return (
    <Skeleton className='w-full h-[800px] mt-3 flex flex-col gap-[20px] px-[30px] bg-white '>
      <div className='wrapper w-full h-full'>
        <div className='w-full h-[600px] rounded-[20px] p-4 animate'>
          <div className='mb-4 flex flex-col gap-[20px]'></div>
        </div>
        <div className='w-full h-[40px] flex gap-[10px]'>
          <div className='w-[40px] h-[40px] rounded-full animate'></div>
          <div className='w-full bg-lightgray px-[20px] py-2 rounded-full flex items-center animate'></div>
        </div>
      </div>
    </Skeleton>
  );
};

export default FeedDetailSkeleton;
