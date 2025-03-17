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
      className='flex flex-col-reverse lg:flex-col w-full justify-between items-center gap-2 lg:hover:cursor-pointer'
      onClick={navigateToDetail}
    >
      <FeedBody title={title} content={content} tags={tags} />
      {thumnailUrl && (
        <div className='w-full lg:flex-shrink-0 lg:max-h-[110px] h-fit'>
          <FeedContentsThumbnail thumbnailUrl={thumnailUrl} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
