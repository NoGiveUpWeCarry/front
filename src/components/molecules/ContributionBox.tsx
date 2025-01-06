interface ContributionBoxProps {
  text: string;
  amount: number;
  onClick: () => void;
}

const ContributionBox = ({ text, amount, onClick }: ContributionBoxProps) => {
  return (
    <button
      className='w-[220px] h-[80px] rounded-[5px] bg-white flex flex-col justify-between p-[10px]'
      onClick={onClick}
    >
      <span className='text-darkgray font-medium text-[15px]'>{text}</span>
      <span className='text-[30px] font-semibold text-black text-right'>
        {amount}
      </span>
    </button>
  );
};

export default ContributionBox;
