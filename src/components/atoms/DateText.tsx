interface DateTextProps {
  date: string;
  hasBg?: boolean;
}

const DateText = ({ date, hasBg = false }: DateTextProps) => {
  return (
    <p className='flex justify-center'>
      <div
        className={`w-fit rounded-[20px] ${hasBg ? 'bg-[#E2E2E2]' : 'bg-none'}`}
      >
        <span className='px-11 text-[13px] text-[#838383]'>
          {date.split('T')[0].split('-').join('.')}
        </span>
      </div>
    </p>
  );
};

export default DateText;
