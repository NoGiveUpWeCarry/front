import Label from '@/components/atoms/Label';
import { ChangeEvent } from 'react';

interface InputWithLabelProps {
  text: string;
  name: string;
  required?: boolean;
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
}

const InputWithLabel = ({
  value,
  setValue,
  name,
  placeholder,
  ...props
}: InputWithLabelProps) => {
  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <Label {...props} />
      <input
        value={value}
        onChange={(e) => setValue(e)}
        name={name}
        className='w-full h-10 rounded-[10px] border border-[#838383] outline-none bg-transparent px-[16px]'
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithLabel;
