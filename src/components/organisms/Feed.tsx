import { feedItem } from '@/mock/feedItem';
import { FeedContents } from '@/components/molecules/contents/ContentsItem';

const Feed = () => {
  return (
    <div className='flex flex-col gap-[30px] w-full'>
      {feedItem.map((item, index) => (
        <FeedContents
          key={index}
          user={item.user}
          title={item.title}
          body={item.body}
          feedTags={item.tags}
          commentsCount={item.commentsCount}
          likesCount={item.likesCount}
          viewsCount={item.viewsCount}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  );
};

export default Feed;
