import Label from '@/components/atoms/Label';

const ApplyFormInput = ({
  name,
  value,
  setValue,
  required,
}: {
  name: [string, string];
  value: string;
  setValue: (name: string, value: string) => void;
  required?: boolean;
}) => {
  const getChar = () => {
    return ['link', 'category'].includes(name[0]) ? '를' : '을';
  };

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <Label text={name[1]} required={required} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.name, e.target.value)}
        name={name[0]}
        className='w-full h-10 rounded-[10px] border border-[#838383] outline-none bg-transparent px-[16px]'
        placeholder={`${name[1]}${getChar()} 입력해주세요`}
      />
    </div>
  );
};

export default ApplyFormInput;
