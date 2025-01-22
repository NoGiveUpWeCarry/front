interface ContentsThumbnailProps {
  src: string;
  alt?: string;
}

// 1.21 피드 이미지 max-height 고정 (마이페이지)

const ContentsThumbnail = ({
  src,
  alt = 'Thumbnail',
}: ContentsThumbnailProps) => {
  return (
    <div className='w-full overflow-hidden'>
      <img
        src={src}
        alt={alt}
        className='w-full h-auto max-h-[120px] object-cover rounded-[20px]'
      />
    </div>
  );
};

export default ContentsThumbnail;
