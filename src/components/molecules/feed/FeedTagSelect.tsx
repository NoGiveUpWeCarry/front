import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { tagItem } from '@/constants/tagItem';
import useFeedSearchStore from '@/store/feedSearchStore';

export const FeedTagSelect = () => {
  const setTags = useFeedSearchStore((state) => state.setTags);

  const handleChange = (value: string) => {
    const tagKey = value === 'all' ? null : (value as keyof typeof tagItem);
    setTags(tagKey);
  };

  return (
    <>
      <Select onValueChange={handleChange} aria-label='태그 선택'>
        <SelectTrigger className='w-[110px] bg-white' aria-label='태그 선택'>
          <SelectValue placeholder='🏷️ 태그' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>🏷️ 태그</SelectItem>
            {Object.keys(tagItem).map((key) => (
              <SelectItem key={key} value={key}>
                #{key}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
