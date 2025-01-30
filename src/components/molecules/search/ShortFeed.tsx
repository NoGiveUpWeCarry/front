import Avatar from '@/components/atoms/Avatar';
import Tag from '@/components/atoms/Tag';
import { FeedResult } from '@/types/search.type';
import { ContentsFeedTagVariant } from '@/types/tags/contentsFeedTag.type';

interface IProps extends FeedResult {
  onClick: () => void;
}

const ShortFeed = ({ onClick, ...props }: IProps) => {
  return (
    <div
      className='w-full flex gap-[10px] cursor-pointer hover:bg-[#fafafa] hover:rounded-lg py-4'
      onClick={onClick}
    >
      <Avatar size='sm' src={props.userProfileUrl} />
      <div className='flex flex-col ite gap-[5px] w-full'>
        <div className='flex items-center gap-[5px] relative w-full'>
          <span className='text-[16px] font-medium'>{props.userNickname}</span>
          <div className='w-[4px] h-[4px] bg-[#838383] rounded-full' />
          <span className='text-[#838383] text-[14px]'>
            {props.createdAt.split('T')[0].replaceAll('-', '.')}
          </span>
          <div className='flex gap-3 absolute right-0'>
            {props.tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                type='contentsFeed'
                variant={tag as ContentsFeedTagVariant}
              />
            ))}
          </div>
        </div>
        <p className='text-[16px] font-medium line-clamp-2'>{props.title}</p>
      </div>
    </div>
  );
};

export default ShortFeed;
