import { InputHTMLAttributes, ReactNode } from 'react';

interface UrlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon: ReactNode;
  category: string;
}

const UrlInput = ({ placeholder, icon, category, ...props }: UrlInputProps) => {
  return (
    <div className='flex flex-col gap-[13px] text-[15px]'>
      <div className='flex w-full'>
        <div className='w-[126px] h-9 bg-white rounded-ss-[10px] rounded-es-[10px] border border-[#DCDCDC] flex items-center pl-[22px] gap-1 font-medium'>
          {icon}
          {category}
        </div>
        <div className='flex-1 h-9 bg-white rounded-se-[10px] rounded-ee-[10px] border border-[#DCDCDC] font-normal'>
          <input
            className='w-full h-full px-[11px] outline-none bg-transparent'
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
