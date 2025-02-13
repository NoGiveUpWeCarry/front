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

  // NOTE: 검색 모달 관련 코드
  // const { isModalOpen, openModal, closeModal, keyword, setKeyword } =
  //   useSearchModal(useShallow((state) => state));
  // useHandlePopState(keyword, openModal, setKeyword);

  if (FeedLoading) {
    return <div>피드 로딩중</div>;
  }

  return (
    <div className='flex w-full flex-col gap-[20px]'>
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
            className='relative bg-white w-full flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden py-[10px] rounded-[20px] z-10'
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
