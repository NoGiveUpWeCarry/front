import FeedContentsThumbnail from '@/components/molecules/feed/FeedContentsThumbnail';
import FeedBody from '@/components/molecules/feed/FeedBody';
import { TagItemKey } from '@/constants/tagItem';
import { useNavigate } from 'react-router-dom';

interface FeedItemProps {
  title: string;
  content: string;
  tags: TagItemKey[];
  thumnailUrl?: string;
  postId: number;
}

const FeedItem = ({
  title,
  content,
  tags,
  thumnailUrl,
  postId,
}: FeedItemProps) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/feed/${postId}`);
  };
  return (
    <div
      className='flex flex-col-reverse md:flex-row w-full justify-between items-center gap-2 md:hover:cursor-pointer'
      onClick={navigateToDetail}
    >
      <FeedBody title={title} content={content} tags={tags} />
      <FeedContentsThumbnail thumbnailUrl={thumnailUrl} />
    </div>
  );
};

export default FeedItem;
