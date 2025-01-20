import FeedBody from '@/components/molecules/contents/FeedBody';
import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import { ContentsFeedTagProps } from '@/types/tags/contentsFeedTag.type';

interface FeedItemProps {
  title: string;
  body: string;
  tags: { label: string; variant: ContentsFeedTagProps['variant'] }[];
  thumbnail?: string;
  sliceBody?: boolean;
}

const FeedItem = ({ thumbnail, sliceBody, ...props }: FeedItemProps) => {
  return (
    <div className='flex w-full justify-between items-center gap-10'>
      <FeedBody {...props} sliceBody={sliceBody} />
      {thumbnail && (
        <div className='w-[180px] flex-shrink-0'>
          <ContentsThumbnail src={thumbnail} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
