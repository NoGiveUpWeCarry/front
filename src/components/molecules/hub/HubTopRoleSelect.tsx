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
import {
  roleItems,
  RoleItemValues,
  roleValueToKeyMap,
} from '@/constants/hub/roleItems';

const HubTopRoleSelect = () => {
  const { setRole, role } = useHubSearchStore();

  const handleRoleChange = (value: string) => {
    setRole(value === 'All' ? '' : (value as keyof typeof roleItems));
  };

  return (
    <div className={cn('flex items-center gap-4')}>
      <Select
        onValueChange={handleRoleChange}
        value={
          role ? roleValueToKeyMap[role as RoleItemValues] || 'All' : 'All'
        }
      >
        <SelectTrigger
          className={cn('w-[80px] sm:w-[120px] md:w-[140px] h-[44px] bg-white')}
        >
          <SelectValue
            placeholder={
              role
                ? roleValueToKeyMap[role as RoleItemValues] || '전체'
                : '전체'
            }
          />
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
