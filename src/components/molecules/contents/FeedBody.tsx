import ContentsTitle from '@/components/atoms/contents/ContentsTitle';
import ContentsBody from '@/components/atoms/contents/ContentsBody';
import { TagItemKey, tagColors } from '@/constants/tagItem';
import clsx from 'clsx';

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
        {tags?.map((tag) => (
          <div
            key={tag}
            className={clsx(
              'px-[5px] py-[2px] text-caption1 rounded-[5px]',
              tagColors[tag]
            )}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedBody;
