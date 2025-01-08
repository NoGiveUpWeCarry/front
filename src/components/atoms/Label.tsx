interface LabelProps {
  text: string;
  required?: boolean;
}

const Label = ({ text, required }: LabelProps) => {
  return (
    <div className='text-[15px] font-medium text-black flex gap-1'>
      <span>{text}</span>
      {required && <span className='text-red-500'>*</span>}
    </div>
  );
};

export default Label;
