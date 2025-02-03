import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { cn } from '@/utils/cn';
import useHubSearchStore from '@/store/hubSeartchStore';
import { roleItems, roleValueToKeyMap } from '@/constants/hub/roleItems';

const HubTopRoleSelect = () => {
  const { setRole, role } = useHubSearchStore();

  const handleRoleChange = (value: string) => {
    setRole(value === 'All' ? null : (value as keyof typeof roleItems));
  };

  return (
    <div className={cn('flex items-center gap-4')}>
      <Select
        onValueChange={handleRoleChange}
        value={role ? roleValueToKeyMap[role] : 'All'}
      >
        <SelectTrigger className={cn('w-[130px] h-[44px] bg-white')}>
          <SelectValue placeholder={role ? roleValueToKeyMap[role] : '전체'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='All'>전체</SelectItem>
            <SelectItem value='Programmer'>Programmer</SelectItem>
            <SelectItem value='Artist'>Artist</SelectItem>
            <SelectItem value='Designer'>Designer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HubTopRoleSelect;
