import { Calendar } from '@/components/ui/calendar';
import useHubStore from '@/store/postHubStore';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from '@radix-ui/themes';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const StartDateSelect = () => {
  const { start_date, setStartDate } = useHubStore((state) => ({
    start_date: state.start_date,
    setStartDate: state.setStartDate,
  }));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setStartDate(format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[280px] h-[44px] justify-start text-left font-normal bg-white border-black',
            !start_date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {start_date || <span>날짜를 선택해주세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={start_date ? new Date(start_date) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default StartDateSelect;
