interface ContentsUserTitleProps {
  name: string;
  job: string;
  time: string;
}

const ContentsUserTitle = ({ name, job, time }: ContentsUserTitleProps) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='font-bold text-gray-900 text-sm'>{name}</span>
      <div className='flex items-center gap-[2px]'>
        <span className='text-gray-500 text-sm'>{job}</span>
        <span className='w-[4px] h-[4px] bg-gray-500 rounded-full'></span>
        <span className='text-gray-400 text-sm'>{time}</span>
      </div>
    </div>
  );
};

export default ContentsUserTitle;
