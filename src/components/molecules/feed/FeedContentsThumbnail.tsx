interface ContentsThumbnailProps {
  thumbnailUrl?: string;
  alt?: string;
}

// 1.21 피드 이미지 max-height 고정 (마이페이지)

const FeedContentsThumbnail = ({
  thumbnailUrl,
  alt = '',
}: ContentsThumbnailProps) => {
  if (!thumbnailUrl) return null;

  return (
    <div className='w-full md:w-[200px] h-fit md:mr-10'>
      <div className='flex md:w-60 w-full max-h-[110px]'>
        <img
          src={thumbnailUrl}
          alt={alt}
          className='w-full object-cover rounded-[20px]'
          loading='lazy'
        />
      </div>
    </div>
  );
};

export default FeedContentsThumbnail;
