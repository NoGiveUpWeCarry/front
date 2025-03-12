import FeedDetailTag from '@/components/molecules/feedDetailTag';
import { Post } from '@/types/feed.type';

interface FeedDetailProps {
  tags: Post['tags'];
  date: Post['createdAt'];
  title: Post['title'];
  content: Post['content'];
}

const FeedDetail = ({ tags, title, content }: FeedDetailProps) => {
  return (
    <div className='lg:px-[50px] px-5 py-[20px] flex flex-col gap-[15px] w-full'>
      <FeedDetailTag tags={tags} />
      <div className='text-lg font-semibold'>{title}</div>
      <div
        className='prose flex flex-col w-full h-fit max-w-none'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default FeedDetail;
