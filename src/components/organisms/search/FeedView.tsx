import { FeedContents } from '@/components/molecules/contents/FeedContentsItem';
import { TagItemKey } from '@/constants/tagItem';
import { useSearchFeed } from '@/hooks/queries/search.query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FeedView = ({ keyword }: { keyword: string }) => {
  const { ref, inView } = useInView();

  const {
    data: feeds,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSearchFeed(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return isPostsLoading ? (
    <div>검색 결과를 가져오는 중 입니다...</div>
  ) : (
    <div className='flex flex-col gap-10'>
      {feeds?.pages[0].posts?.map((post) => (
        <FeedContents
          key={post.postId}
          {...post}
          feedTags={post.tags as TagItemKey[]}
          thumnailUrl={post.thumbnailUrl}
          postId={Number(post.postId)}
          commentsCount={post.commentCount}
          likesCount={post.likeCount}
          viewsCount={post.viewCount}
          user={{
            avatarSrc: post.userProfileUrl,
            name: post.userNickname,
            job: post.userRole,
            time: post.createdAt,
          }}
        />
      ))}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default FeedView;
