import Icon from '@/components/atoms/Icon';
import FeedDetailUserInfo from '@/components/molecules/FeedDetailUserInfo';
import FeedDetail from '@/components/molecules/contents/FeedDetail';
import FeedDetailSkeleton from '@/components/molecules/skeletons/FeedDetailSkeleton';
import { useFetchFeed, useFetchFeedChat } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const FeedDetailChat = lazy(() => {
  return import('@/components/organisms/FeedDetailChat');
});

const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: FeedData, isLoading: FeedLoading } = useFetchFeed(Number(id));
  const { data: ChatData, isLoading: ChatLoading } = useFetchFeedChat(
    Number(id)
  );
  console.log('ChatData: ', ChatData);
  const post = FeedData?.post;
  const comments = ChatData?.comments;
  const userId = useAuthStore((state) => state.userInfo?.userId);
  if (FeedLoading) {
    <div>피드 로딩중</div>;
  }
  return (
    <div className='flex flex-col gap-3'>
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
            className='relative bg-white w-full flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden py-[10px]'
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
          </div>
          <div className='fixed bottom-[10px] bg-[#4B4B4B] w-[55%] h-[40px] rounded-[10px] py-[10px] px-[200px] flex justify-between text-white text-heading2'>
            <div className='flex'>
              <Icon
                type='chatBubbleOvalLeftEllipsis'
                className='w-[24px] h-[24px] text-white'
              />
              &nbsp;
              {post.commentCount}
            </div>
            <div className='flex'>
              <Icon type='like' className='w-[24px] h-[24px] text-white' />
              &nbsp;
              {post.likeCount}
            </div>
            <div className='flex'>
              <Icon type='eye' className='w-[24px] h-[24px] text-white' />
              &nbsp;
              {post.viewCount}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedDetailPage;
