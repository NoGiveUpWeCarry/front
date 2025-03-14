import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

interface BaseSearchFormProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    Pick<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: ReactNode;
  className?: string;
}

const BaseSearchForm = ({
  value,
  onSubmit,
  onChange,
  children,
  className,
}: BaseSearchFormProps) => {
  return (
    <div className='relative'>
      <form onSubmit={onSubmit}>
        <button className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
          <Icon type='search' color='gray' className='text-[#CCCCCC]' />
        </button>
        <Input
          type='text'
          placeholder='검색'
          className={`pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3] ${className}`}
          value={value}
          onChange={onChange}
        />
        {children}
      </form>
    </div>
  );
};

export default BaseSearchForm;
