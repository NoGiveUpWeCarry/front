import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { InputHTMLAttributes } from 'react';

const SearchInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <div className='mb-6 w-full h-6 flex items-center'>
    <Icon type='search' className='w-6 h-6' color='gray' />
    <Input
      bgColor='transparent'
      className='border-0 h-full !text-[16px]'
      autoFocus
      placeholder='검색어 입력'
      {...props}
    />
  </div>
);

export default SearchInput;
