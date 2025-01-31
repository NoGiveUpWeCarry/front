import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import FeedBody from '@/components/molecules/contents/FeedBody';
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
          <ContentsThumbnail thumbnailUrl={thumnailUrl} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
