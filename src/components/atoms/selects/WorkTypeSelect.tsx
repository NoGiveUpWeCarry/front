import {
  meetingTagItems,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import useHubStore from '@/store/postHubStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

const WorkTypeSelect = () => {
  const { work_type, setWorkType } = useHubStore((state) => ({
    work_type: state.work_type,
    setWorkType: state.setWorkType,
  }));

  return (
    <Select
      onValueChange={(value) => setWorkType(value as meetingTagItemskey)}
      value={work_type}
    >
      <SelectTrigger className='w-[120px] border border-black h-[44px] px-2'>
        <SelectValue placeholder='작업 방식' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(meetingTagItems).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WorkTypeSelect;
