import FeedBody from '@/components/molecules/contents/FeedBody';
import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import { ContentsFeedTagProps } from '@/types/tags/contentsFeedTag.type';

interface FeedItemProps {
  title: string;
  body: string;
  tags: { label: string; variant: ContentsFeedTagProps['variant'] }[];
  thumbnail?: string;
}

const FeedItem = ({ title, body, tags, thumbnail }: FeedItemProps) => {
  return (
    <div className='flex w-full'>
      <div className='flex items-start gap-10'>
        <div className='flex-1 min-w-0'>
          <FeedBody title={title} body={body} tags={tags} />
        </div>

        {thumbnail && (
          <div className='w-[180px] flex-shrink-0'>
            <ContentsThumbnail src={thumbnail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedItem;
