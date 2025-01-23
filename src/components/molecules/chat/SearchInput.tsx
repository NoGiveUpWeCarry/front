import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { FormHTMLAttributes, InputHTMLAttributes } from 'react';

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'>,
    Pick<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {}

const SearchInput = ({
  value,
  onChange,
  onSubmit,
  ...props
}: SearchInputProps) => {
  return (
    <div className='relative'>
      <form onSubmit={onSubmit}>
        <button className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
          <Icon type='search' color='gray' className='text-[#CCCCCC]' />
        </button>
        <Input
          type='text'
          placeholder='검색'
          className='pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3]'
          value={value}
          onChange={onChange}
          {...props}
        />
      </form>
    </div>
  );
};

export default SearchInput;
