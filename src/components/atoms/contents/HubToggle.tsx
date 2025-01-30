import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useHubSearchStore from '@/store/hubSeartchStore';

export function HubToggle() {
  const setLatest = useHubSearchStore((state) => state.setSort);
  const onChangeToggle = (value: string) => {
    setLatest(value === 'recent');
  };
  return (
    <ToggleGroup
      type='single'
      defaultValue='recent'
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
