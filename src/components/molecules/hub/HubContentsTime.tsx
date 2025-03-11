interface HubContentsTimeProps {
  startDate: string;
  duration: string;
}

const HubContentsTime = ({ startDate, duration }: HubContentsTimeProps) => {
  return (
    <div className='flex text-[12px] text-[#7d7d7d] gap-[10px]'>
      <span>시작 예정일 : {startDate}</span>
      <span>예상 기간 : {duration}</span>
    </div>
  );
};

export default HubContentsTime;
