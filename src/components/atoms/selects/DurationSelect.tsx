import { Input } from '@/components/ui/input';
import useHubStore from '@/store/postHubStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

const DurationSelect = () => {
  const { duration, setDuration } = useHubStore((state) => ({
    duration: state.duration,
    setDuration: state.setDuration,
  }));

  const [durationValue, durationUnit] = duration
    .match(/^(\d+)?(.*)$/)
    ?.slice(1) || ['', '개월'];

  const handleDurationValueChange = (value: string) => {
    const updatedDuration = `${value}${durationUnit}`;
    setDuration(updatedDuration);
  };

  const handleDurationUnitChange = (unit: string) => {
    const updatedDuration = `${durationValue}${unit}`;
    setDuration(updatedDuration);
  };

  return (
    <div className='flex items-center gap-2'>
      <Select
        onValueChange={handleDurationUnitChange}
        value={durationUnit || '개월'}
      >
        <SelectTrigger className='w-[90px] border border-black rounded-sm h-[44px]'>
          <SelectValue placeholder='단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='개월'>개월</SelectItem>
          <SelectItem value='주'>주</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type='number'
        placeholder='0'
        className='w-[90px] border border-black rounded-sm h-[44px] px-2'
        value={durationValue}
        onChange={(e) => handleDurationValueChange(e.target.value)}
      />
    </div>
  );
};

export default DurationSelect;
