import { tagColors, tagItem } from '@/constants/tagItem';

interface FeedDetailTagProps {
  tags: (keyof typeof tagItem)[];
}

const feedDetailTag = ({ tags }: FeedDetailTagProps) => {
  return (
    <ul className='w-full z-50 flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <li key={tag}>
          <div className={`px-2 py-1 rounded-[3px] ${tagColors[tag]}`}>
            # {tag}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default feedDetailTag;
