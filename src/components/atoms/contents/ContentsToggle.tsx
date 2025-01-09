import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function ContentsToggle() {
  return (
    <ToggleGroup
      type='single'
      defaultValue='recent'
      className='flex items-center bg-gray-200 rounded-lg p-[4px]'
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
