interface HubDetailUserProps {
  nickname: string;
  introduce?: string;
}

const HubDetailUser = ({ nickname, introduce }: HubDetailUserProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='flex text-[20px] font-semibold'>{nickname}</div>
      <div className='flex text-[14px] font-semibold text-[#838383]'>
        {introduce}
      </div>
    </div>
  );
};

export default HubDetailUser;
