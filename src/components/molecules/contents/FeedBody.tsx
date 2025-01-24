// 컨텐츠 타이틀 + 바디 + 태그
import ContentsTitle from '@/components/atoms/contents/ContentsTitle';
import ContentsBody from '@/components/atoms/contents/ContentsBody';
import { TagItemKey } from '@/constants/tagItem';

interface FeedBodyProps {
  title: string;
  content: string;
  tags: TagItemKey[];
}

const FeedBody = ({ title, content, tags }: FeedBodyProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsTitle title={title} />
      <ContentsBody body={content} />
      <div className='flex gap-[10px]'>
        {tags.map((tag) => (
          <div>{tag}</div>
        ))}
      </div>
    </div>
  );
};

export default FeedBody;
