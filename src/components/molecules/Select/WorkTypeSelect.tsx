import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { HubState } from '@/store/postHubStore';

interface WorkTypeSelectProps {
  selectedWorkType: HubState['workType'];
  onChange: (value: HubState['workType']) => void;
}

const WorkTypeSelect = ({
  selectedWorkType,
  onChange,
}: WorkTypeSelectProps) => {
  return (
    <Select onValueChange={onChange} value={selectedWorkType}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='작업 방식' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='OFFLINE'>대면</SelectItem>
        <SelectItem value='ONLINE'>원격</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default WorkTypeSelect;
