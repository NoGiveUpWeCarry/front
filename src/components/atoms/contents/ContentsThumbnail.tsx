interface ContentsThumbnailProps {
  src: string;
  alt?: string;
}

const ContentsThumbnail = ({
  src,
  alt = 'Thumbnail',
}: ContentsThumbnailProps) => {
  return (
    <div className='w-full'>
      <img
        src={src}
        alt={alt}
        className='w-full h-auto object-cover rounded-[20px]'
      />
    </div>
  );
};

export default ContentsThumbnail;
