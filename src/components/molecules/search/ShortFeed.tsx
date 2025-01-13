import Avatar from '@/components/atoms/Avatar';
import Tag from '@/components/atoms/Tag';
import { FeedItemType } from '@/types/feed.type';

interface IProps extends FeedItemType {
  onClick: () => void;
}

const ShortFeed = ({ onClick, ...props }: IProps) => {
  const { user, body, tags } = props;
  return (
    <div className='w-full flex gap-[10px] cursor-pointer' onClick={onClick}>
      <Avatar size='sm' src={user.avatarSrc} />
      <div className='flex flex-col ite gap-[5px]'>
        <div className='flex items-center gap-[5px]'>
          <span className='text-[16px] font-medium'>{user.name}</span>
          <span className='text-[14px] text-[#838383]'>
            {user.job.toUpperCase()}
          </span>
          <div className='w-[4px] h-[4px] bg-[#838383] rounded-full' />
          <span className='text-[#838383] text-[14px]'>{user.time}</span>
        </div>
        <p className='text-[16px] font-medium line-clamp-2'>{body}</p>
        <div className='flex gap-3'>
          {tags.map((tag) => (
            <Tag
              key={tag.label}
              label={tag.label}
              type='contentsFeed'
              variant={tag.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortFeed;
