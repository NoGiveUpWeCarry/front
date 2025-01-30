import { XMarkIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes, ReactNode } from 'react';

interface UrlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon: ReactNode;
  category: string;
  onDelete?: () => void;
}

const UrlInput = ({
  placeholder,
  icon,
  category,
  onDelete,
  ...props
}: UrlInputProps) => {
  return (
    <div className='flex flex-col gap-[13px] text-[15px]'>
      <div className='flex w-full'>
        <div className='w-[126px] h-9 bg-white rounded-ss-[10px] rounded-es-[10px] border border-[#DCDCDC] flex items-center pl-[22px] gap-1 font-medium'>
          {icon}
          {category}
        </div>
        <div className='relative flex-1 h-9 bg-white rounded-se-[10px] rounded-ee-[10px] border border-[#DCDCDC] font-normal'>
          <input
            className='w-full h-full px-[11px] outline-none bg-transparent pr-10'
            placeholder={placeholder}
            {...props}
          />
          <button
            className='absolute top-1/2 right-0 transform -translate-y-1/2 px-2 text-[#838383] hover:text-black'
            onClick={onDelete}
          >
            <XMarkIcon width={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
