import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedListContent from '@/components/organisms/feed/FeedListContent';
import { useSearchFeed } from '@/hooks/queries/search.query';
import { TagItemKey } from '@/constants/tagItem';
import { PostsResponse } from '@/types/search.type';

const FeedView = ({ keyword }: { keyword: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchFeed(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className='text-[14px]'>검색 결과를 가져오는 중 입니다...</div>;
  }

  if (data?.pages[0].posts?.length === 0) {
    return <div className='text-[14px]'>검색 결과가 존재하지 않습니다.</div>;
  }

  return (
    <div className='flex flex-col gap-10'>
      {data?.pages.map((page: any) =>
        page.posts.map((post: PostsResponse) => {
          return (
            <FeedListContent
              key={post.postId}
              {...post}
              feedTags={post.tags as TagItemKey[]}
              thumnailUrl={post.thumnailUrl}
              postId={Number(post.postId)}
              commentsCount={post.commentCount}
              likesCount={post.likeCount}
              viewsCount={post.viewCount}
              user={{
                avatarSrc: post.userProfileUrl,
                name: post.userNickname,
                job: post.userRole,
                time: post.createdAt,
                hideRole: true,
              }}
            />
          );
        })
      )}
      <div ref={ref} className='h-10' />
    </div>
  );
};

export default FeedView;
