import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface PopupData {
  onClick: () => void;
  text: string;
  icon: ReactNode;
}

interface IProps {
  popupHandler: PopupData[];
  position: 'right' | 'bottom';
  className?: string;
}

const Popup = ({ popupHandler, position, className }: IProps) => {
  const popupStyle = cva(
    'inline-flex items-center justify-center cursor-pointer',
    {
      variants: {
        position: {
          right: 'top-[-30%] transform -translate-y-1/2 text-[18px] ',
          bottom: 'left-0 mt-3 text-[15px]',
        },
      },
      defaultVariants: {
        position: 'right',
      },
    }
  );

  return (
    <div
      className={cn(
        'absolute w-max left-full transition-opacity duration-300 z-50',
        popupStyle({ position })
      )}
    >
      <div
        className={`flex w-full bg-white rounded-xl items-center px-[10px] py-[10px] drop-shadow-lg ${position === 'right' && 'ml-4'}`}
      >
        <div
          className={`flex w-full flex-col ${position === 'right' ? 'gap-[10px]' : 'gap-1'} ${className}`}
        >
          {popupHandler.map((item) => (
            <button
              key={item.text}
              className={`group flex w-full rounded-lg px-1 py-2 items-center ${position === 'right' ? 'gap-[20px]' : 'gap-[10px]'} cursor-pointer hover:bg-[#f3f4f6]`}
              onClick={item.onClick}
            >
              {item.icon}
              <div className='flex text-[#48484a]'>{item.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
