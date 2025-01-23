// 컨텐츠 타이틀 + 바디 + 태그
import ContentsTitle from '@/components/atoms/contents/ContentsTitle';
import ContentsBody from '@/components/atoms/contents/ContentsBody';
import { ContentsFeedTagProps } from '@/types/tags/contentsFeedTag.type';
import Tag from '@/components/atoms/Tag';

interface FeedBodyProps {
  title: string;
  body: string;
  tags: { label: string; variant: ContentsFeedTagProps['variant'] }[];
  sliceBody?: boolean;
}

const FeedBody = ({ title, body, tags, sliceBody }: FeedBodyProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsTitle title={title} />
      <ContentsBody body={body} sliceBody={sliceBody} />
      <div className='flex gap-[10px]'>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            label={tag.label}
            type='contentsFeed'
            variant={tag.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedBody;
