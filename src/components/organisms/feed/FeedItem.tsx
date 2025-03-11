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
      className='flex w-full justify-between items-center gap-10 hover:cursor-pointer hover:sh'
      onClick={navigateToDetail}
    >
      <FeedBody title={title} content={content} tags={tags} />
      {thumnailUrl && (
        <div className='w-[180px] flex-shrink-0 max-h-[110px]'>
          <FeedContentsThumbnail thumbnailUrl={thumnailUrl} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
