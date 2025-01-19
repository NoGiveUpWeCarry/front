import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div className='relative'>
      <span className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
        <Icon type='search' color='gray' className='text-[#CCCCCC]' />
      </span>
      <Input
        type='text'
        placeholder='검색'
        className='pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3]'
        {...props}
      />
    </div>
  );
};

export default SearchInput;
