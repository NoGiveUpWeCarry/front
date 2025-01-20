interface ContentsThumbnailProps {
  src: string;
  alt?: string;
}

const ContentsThumbnail = ({
  src,
  alt = 'Thumbnail',
}: ContentsThumbnailProps) => {
  return (
    <div className='w-full overflow-hidden'>
      <img
        src={src}
        alt={alt}
        className='w-full h-auto max-h-[177.5px] object-cover rounded-[20px]'
      />
    </div>
  );
};

export default ContentsThumbnail;
