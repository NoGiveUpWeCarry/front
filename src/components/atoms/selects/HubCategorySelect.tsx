import { hubTagItems, HubTagItemsKey } from '@/constants/hub/hubTagItems';
import useHubStore from '@/store/postHubStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

const HubCategorySelect = () => {
  const { hub_type, setHubType } = useHubStore((state) => ({
    hub_type: state.hub_type,
    setHubType: state.setHubType,
  }));

  return (
    <Select
      onValueChange={(value) => setHubType(value as HubTagItemsKey)}
      value={hub_type}
    >
      <SelectTrigger className='w-[120px] border border-black h-[44px] px-2'>
        <SelectValue placeholder='허브 유형' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(hubTagItems).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HubCategorySelect;
