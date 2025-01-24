import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import FeedBody from '@/components/molecules/contents/FeedBody';
import { TagItemKey } from '@/constants/tagItem';
import { useNavigate } from 'react-router-dom';

interface FeedItemProps {
  title: string;
  content: string;
  tags: TagItemKey[];
  thumbnailUrl?: string;
  postId: number;
}

const FeedItem = ({
  title,
  content,
  tags,
  thumbnailUrl,
  postId,
}: FeedItemProps) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/feed/${postId}`);
  };
  return (
    <div
      className='flex w-full justify-between items-center gap-10'
      onClick={navigateToDetail}
    >
      <FeedBody title={title} content={content} tags={tags} />
      {thumbnailUrl && (
        <div className='w-[180px] flex-shrink-0'>
          <ContentsThumbnail thumbnailUrl={thumbnailUrl} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
