import FeedDetailTag from '@/components/molecules/feedDetailTag';
import { Post } from '@/types/feed.type';

interface FeedDetailProps {
  tags: Post['tags'];
  date: Post['createdAt'];
  title: Post['title'];
  content: Post['content'];
}

const FeedDetail = ({ tags, date, title, content }: FeedDetailProps) => {
  return (
    <div className='px-[50px] py-[20px] flex flex-col gap-[20px] w-full'>
      <FeedDetailTag tags={tags} />
      <div className='text-gray text-body1'>{date}</div>
      <div className='text-heading1 font-semibold'>{title}</div>
      <div
        className='prose flex flex-col w-full h-fit max-w-none'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default FeedDetail;
