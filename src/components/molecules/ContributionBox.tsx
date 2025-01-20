interface ContributionBoxProps {
  text: string;
  amount: number;
  onClick: () => void;
}

const ContributionBox = ({ text, amount, onClick }: ContributionBoxProps) => {
  return (
    <button
      className='max-w-[260px] h-[80px] rounded-[5px] bg-white flex flex-col justify-between p-[10px]'
      onClick={onClick}
    >
      <span className='text-darkgray font-medium text-[15px]'>{text}</span>
      <p className='w-full flex justify-end'>
        <span className='text-[30px] font-semibold text-black'>{amount}</span>
      </p>
    </button>
  );
};

export default ContributionBox;
