import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { FeedFooter } from '@/components/molecules/contents/FeedFooter';
import FeedItem from '@/components/molecules/contents/FeedItem';
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
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
  };
}

export const FeedContents = ({
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
      />

      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
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
