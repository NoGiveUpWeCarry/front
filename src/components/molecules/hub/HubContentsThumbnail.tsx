interface ContentsThumbnailProps {
  thumbnailUrl?: string;
  alt?: string;
}

// 1.21 피드 이미지 max-height 고정 (마이페이지)

const HubContentsThumbnail = ({
  thumbnailUrl,
  alt = '',
}: ContentsThumbnailProps) => {
  return (
    <div className='flex w-full '>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={alt}
          className='w-full object-cover rounded-[20px] h-auto'
        />
      ) : null}
    </div>
  );
};

export default HubContentsThumbnail;
