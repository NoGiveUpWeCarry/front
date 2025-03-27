import Label from '@/components/atoms/Label';

const ApplyFormInput = ({
  name,
  value,
  setValue,
  required,
}: {
  name: {
    eng: string;
    kor: string;
  };
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
}) => {
  const getChar = () => {
    return ['link', 'category'].includes(name.eng) ? '를' : '을';
  };

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <Label text={name.kor} required={required} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name.eng}
        className='w-full h-10 rounded-[10px] border border-[#838383] outline-none bg-transparent px-[16px]'
        placeholder={`${name.kor}${getChar()} 입력해주세요`}
      />
    </div>
  );
};

export default ApplyFormInput;
