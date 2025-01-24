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
    <div className='px-[50px] flex flex-col gap-[20px] mt-3'>
      <FeedDetailTag tags={tags} />
      <div className='text-gray text-body1'>{date}</div>
      <div className='text-heading1'>{title}</div>
      <div
        className='prose w-full h-fit'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default FeedDetail;
