import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useHubSearchStore from '@/store/hubSeartchStore';

export function ContentsHubToggle() {
  const sort = useHubSearchStore((state) => state.sort);
  const setSort = useHubSearchStore((state) => state.setSort);

  const onChangeToggle = (value: string) => {
    setSort(value === 'recent');
  };

  return (
    <ToggleGroup
      type='single'
      defaultValue={sort ? 'recent' : 'popular'}
      className='flex items-center bg-[#eaeaea] rounded-lg p-[4px]'
      onValueChange={onChangeToggle}
    >
      <ToggleGroupItem
        value='recent'
        className='px-3 text-[12px] font-medium rounded-lg text-gray-400 data-[state=on]:bg-white data-[state=on]:text-black'
      >
        최신
      </ToggleGroupItem>
      <ToggleGroupItem
        value='popular'
        className='px-3 text-[12px] font-medium rounded-lg text-gray-400 data-[state=on]:bg-white data-[state=on]:text-black'
      >
        인기
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
