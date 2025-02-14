import ContentsUser from '@/components/molecules/feed/ContentsUser';
import { FeedFooter } from '@/components/organisms/feed/FeedFooter';
import FeedItem from '@/components/organisms/feed/FeedItem';
import { TagItemKey } from '@/constants/tagItem';

interface FeedContentsProps {
  title: string;
  content: string;
  feedTags: TagItemKey[];
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  thumnailUrl?: string;
  postId: number;
  isLiked: boolean;
  createdAt: string;
  user: {
    id?: number;
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
  };
}

const FeedListContent = ({
  title,
  content,
  feedTags,
  commentsCount,
  likesCount,
  viewsCount,
  thumnailUrl,
  user,
  postId,
  isLiked,
  createdAt,
}: FeedContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        userProfileUrl={user.avatarSrc}
        name={user.name}
        userRole={user.job}
        createdAt={createdAt}
        userId={user.id!}
      />
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full hover:shadow-orange-50'>
          <div className='flex flex-col gap-[20px]'>
            <FeedItem
              title={title}
              content={content}
              tags={feedTags}
              thumnailUrl={thumnailUrl}
              postId={postId}
            />
            <FeedFooter
              commentsCount={commentsCount}
              likesCount={likesCount}
              viewsCount={viewsCount}
              isLiked={isLiked}
              postId={postId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedListContent;
