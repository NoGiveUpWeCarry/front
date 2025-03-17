import FeedDetailTag from '@/components/molecules/feedDetailTag';
import { Post } from '@/types/feed.type';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

interface FeedDetailProps {
  tags: Post['tags'];
  title: Post['title'];
  content: Post['content'];
}

const FeedDetail = ({ tags, title, content }: FeedDetailProps) => {
  const getContent = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return parse(sanitizedHtml);
  };

  return (
    <div className='lg:px-[50px] px-5 py-[20px] flex flex-col gap-[15px] w-full'>
      <FeedDetailTag tags={tags} />
      <div className='text-lg font-semibold'>{title}</div>
      <div className='prose flex flex-col w-full h-fit max-w-none'>
        {getContent(content)}
      </div>
    </div>
  );
};

export default FeedDetail;
