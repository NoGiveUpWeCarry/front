interface ContributionBoxProps {
  text: string;
  amount: number;
}

const ContributionBox = ({ text, amount }: ContributionBoxProps) => {
  return (
    <div className='w-[220px] h-[80px] rounded-[5px] bg-white flex flex-col justify-between p-[10px]'>
      <span className='text-darkgray font-medium text-[15px]'>{text}</span>
      <span className='text-[30px] font-semibold text-black text-right'>
        {amount}
      </span>
    </div>
  );
};

export default ContributionBox;
