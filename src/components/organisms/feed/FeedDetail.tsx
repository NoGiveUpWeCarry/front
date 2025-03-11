import FeedDetailTag from '@/components/molecules/feedDetailTag';
import { Post } from '@/types/feed.type';
import formatDate from '@/utils/formatDate';

interface FeedDetailProps {
  tags: Post['tags'];
  date: Post['createdAt'];
  title: Post['title'];
  content: Post['content'];
}

const FeedDetail = ({ tags, date, title, content }: FeedDetailProps) => {
  return (
    <div className='px-[50px] py-[20px] flex flex-col gap-[15px] w-full'>
      <FeedDetailTag tags={tags} />
      {/* <div className='text-gray text-body1'>{formatDate(date)}</div> */}
      <div className='text-lg font-semibold'>{title}</div>
      <div
        className='prose flex flex-col w-full h-fit max-w-none'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default FeedDetail;
