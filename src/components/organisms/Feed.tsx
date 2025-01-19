import { feedItem } from '@/mocks/mock-data/feedItem';
import { FeedContents } from '@/components/molecules/contents/ContentsItem';
import { useEffect, useState } from 'react';
import { FeedItemType } from '@/types/feed.type';

interface FeedProps {
  keyword?: string;
}

const Feed = ({ keyword }: FeedProps) => {
  const [data, setData] = useState<FeedItemType[]>([]);

  useEffect(() => {
    if (!keyword) setData(feedItem);
    else {
      setData(
        feedItem.filter(
          (el) => el.title.includes(keyword) || el.body.includes(keyword)
        )
      );
    }
  }, [keyword]);

  return (
    <div className='flex flex-col gap-[30px] w-full'>
      {data.map((item) => (
        <FeedContents
          key={item.title + new Date().toISOString()}
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
      {keyword && !data.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Feed;
