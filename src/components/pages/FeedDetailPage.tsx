import Icon from '@/components/atoms/Icon';
import FeedDetailFooter from '@/components/molecules/FeedDetailFooter';
import FeedDetailUserInfo from '@/components/molecules/FeedDetailUserInfo';
import FeedDetailSkeleton from '@/components/molecules/skeletons/FeedDetailSkeleton';
import FeedDetail from '@/components/organisms/feed/FeedDetail';
import { useFetchFeed, useFetchFeedChat } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { useSearchModal } from '@/store/modals/searchModalstore';
import MetaTag from '@/utils/MetaTags';
import { Suspense, lazy, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const FeedDetailChat = lazy(() => {
  return import('@/components/organisms/feed/FeedDetailChat');
});

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: FeedData, isLoading: FeedLoading } = useFetchFeed(Number(id));
  const { data: ChatData, isLoading: ChatLoading } = useFetchFeedChat(
    Number(id)
  );

  // 검색 관련 코드
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { keyword: searchKeyword } = useSearchModal();

  useEffect(() => {
    if (query.get('from') === 'search') {
      const handlePopState = () => {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.includes('q=')
          ? currentUrl
          : `${currentUrl}?q=${searchKeyword}`;
        window.history.pushState(null, '', newUrl);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [location]);

  const post = FeedData?.post;
  const comments = ChatData?.comments;

  const userId = useAuthStore((state) => state.userInfo?.userId);
  if (FeedLoading) {
    return <div>피드 로딩중</div>;
  }

  return (
    <div className='flex w-full flex-col lg:gap-[20px] gap-3 relative'>
      <MetaTag
        title={post?.title}
        description={post?.title}
        imgSrc={post?.thumnailUrl}
        url={`/feed/${id}`}
      />
      <div className='w-full flex pb-2 justify-between px-11'>
        <button className='w-6 h-6' onClick={() => navigate(-1)}>
          <Icon type='behindSolid' />
        </button>
        <div className='font-regular text-md'>피드 상세</div>
        <div></div>
      </div>
      {post && (
        <>
          <FeedDetailUserInfo
            userNickname={post.userName}
            userProfileUrl={post.userProfileUrl}
            userRole={post.userRole}
            createdAt={post.createdAt}
            userId={post.userId}
            isWriter={userId === post.userId}
            postId={post.postId}
          />
          <div
            className='w-full flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden border-t-[1px] relative'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <FeedDetail
              tags={post.tags}
              // date={post.createdAt}
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
          <FeedDetailFooter
            commentCount={post.commentCount}
            likeCount={post.likeCount}
            viewCount={post.viewCount}
            isLiked={post.isLiked}
            postId={post.postId}
          />
        </>
      )}
    </div>
  );
};

export default FeedDetailPage;
