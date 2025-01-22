interface HubDetailUserProps {
  userNickname: string;
  userIntroduce: string;
}

const HubDetailUser = ({ userNickname, userIntroduce }: HubDetailUserProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='flex text-[20px] font-semibold'>{userNickname}</div>
      <div className='flex text-[14px] font-semibold text-[#838383]'>
        {userIntroduce}
      </div>
    </div>
  );
};

export default HubDetailUser;
