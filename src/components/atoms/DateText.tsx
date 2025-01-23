import { cn } from '@/lib/utils';

interface DateTextProps {
  date: string;
  hasBg?: boolean;
  className?: string;
}

const DateText = ({ date, hasBg = false, className }: DateTextProps) => {
  return (
    <p className={cn('flex justify-center', className)}>
      <div
        className={`w-fit rounded-[20px] ${hasBg ? 'bg-[#E2E2E2]' : 'bg-none'}`}
      >
        <span
          className={cn('flex px-11 text-[13px] text-[#838383] gap-1 py-[1px]')}
        >
          {date.split('T')[0].split('-').join('.')}
        </span>
      </div>
    </p>
  );
};

export default DateText;
