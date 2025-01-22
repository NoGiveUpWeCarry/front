interface ContentsThumbnailProps {
  thumbnailUrl?: string;
  alt?: string;
}

const ContentsThumbnail = ({
  thumbnailUrl,
  alt = '',
}: ContentsThumbnailProps) => {
  return (
    <div className='flex w-full h-full'>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={alt}
          className='w-full object-cover rounded-[20px]'
        />
      ) : null}
    </div>
  );
};

export default ContentsThumbnail;
