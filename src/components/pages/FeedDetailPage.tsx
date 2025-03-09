import Icon from '@/components/atoms/Icon';
import FeedDetailFooter from '@/components/molecules/FeedDetailFooter';
import FeedDetailUserInfo from '@/components/molecules/FeedDetailUserInfo';
import FeedDetailSkeleton from '@/components/molecules/skeletons/FeedDetailSkeleton';
import FeedDetail from '@/components/organisms/feed/FeedDetail';
import { useFetchFeed, useFetchFeedChat } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const FeedDetailChat = lazy(() => {
  return import('@/components/organisms/feed/FeedDetailChat');
});

const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: FeedData, isLoading: FeedLoading } = useFetchFeed(Number(id));
  const { data: ChatData, isLoading: ChatLoading } = useFetchFeedChat(
    Number(id)
  );

  const post = FeedData?.post;
  const comments = ChatData?.comments;

  const userId = useAuthStore((state) => state.userInfo?.userId);
  if (FeedLoading) {
    return <div>피드 로딩중</div>;
  }

  return (
    <div className='flex w-full flex-col lg:gap-[20px] gap-3'>
      <div className='w-full flex pb-2 justify-between'>
        <div className='w-6 h-6' onClick={() => window.history.back()}>
          <Icon type={'behindSolid'} />
        </div>
        <div className='font-bold text-md'>{FeedData?.post.userName}</div>
        <div></div>
      </div>
      {post && (
        <>
          <FeedDetailUserInfo
            userNickname={post.userName}
            userProfileUrl={post.userProfileUrl}
            userRole={post.userRole}
            title={post.title}
            createdAt={post.createdAt}
            userId={post.userId}
            isWriter={userId === post.userId}
            postId={post.postId}
          />
          <div
            className='w-full flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden  z-10 border-t-[1px]'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <FeedDetail
              tags={post.tags}
              date={post.createdAt}
              title={post.title}
              content={post.content}
            />
            <Suspense>
              {ChatLoading ? (
                <FeedDetailSkeleton />
              ) : (
                <FeedDetailChat
                  comments={comments || []}
                  feedId={post.postId}
                />
              )}
            </Suspense>
            <FeedDetailFooter
              commentCount={post.commentCount}
              likeCount={post.likeCount}
              viewCount={post.viewCount}
              isLiked={post.isLiked}
              postId={post.postId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FeedDetailPage;
