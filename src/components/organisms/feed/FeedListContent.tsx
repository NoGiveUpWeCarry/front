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
    hideRole?: boolean;
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
    <div className='flex flex-col gap-3 rounded-[10px] p-5 w-full lg:hover:shadow-[4px_4px_6px_rgba(0,0,0,0.1)] lg:bg-transparent bg-white lg:m-0'>
      <ContentsUser
        userProfileUrl={user.avatarSrc}
        name={user.name}
        userRole={user.job}
        createdAt={createdAt}
        userId={user.id!}
        hideRole={user.hideRole}
      />
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
  );
};

export default FeedListContent;
