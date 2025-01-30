import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { HubState } from '@/store/postHubStore';

interface HubCategoryProps {
  selectedHubType: HubState['hubType'];
  onChange: (value: HubState['hubType']) => void;
}

const ProjectTypeSelect = ({ selectedHubType, onChange }: HubCategoryProps) => {
  return (
    <Select onValueChange={onChange} value={selectedHubType}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='허브 유형' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='PROJECT'>프로젝트</SelectItem>
        <SelectItem value='OUTSOURCING'>외주</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProjectTypeSelect;
