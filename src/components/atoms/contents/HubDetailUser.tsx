interface HubDetailUserProps {
  name: string;
  introduce: string;
}

const HubDetailUser = ({ name, introduce }: HubDetailUserProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='flex text-[20px] font-semibold'>{name}</div>
      <div className='flex text-[14px] font-semibold text-[#838383]'>
        {introduce}
      </div>
    </div>
  );
};

export default HubDetailUser;
