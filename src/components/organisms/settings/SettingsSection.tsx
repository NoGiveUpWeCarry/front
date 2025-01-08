import Input from '@/components/atoms/Input';
import Toggle from '@/components/atoms/Toggle';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const SettingsSection = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

SettingsSection.Title = ({ children }: { children: ReactNode }) => {
  return <h1 className='text-[25px] font-medium'>{children}</h1>;
};

SettingsSection.Description = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h2 className='mt-1 text-[16px] text-[#838383] font-normal'>
        {children}
      </h2>
      <SettingsSection.Divider />
    </>
  );
};

SettingsSection.Divider = () => {
  return <div className='w-full h-[1px] bg-[#DCDCDC] mt-[20px] mb-[30px]' />;
};

SettingsSection.Content = ({
  children,
  gap,
}: {
  children: ReactNode;
  gap: number;
}) => {
  return (
    <div className={`flex flex-col`} style={{ gap }}>
      {children}
    </div>
  );
};

SettingsSection.InputWithLabel = ({
  label,
  className,
  children,
  button,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
  button?: {
    text: string;
    color: 'normal' | 'delete' | 'disabled';
  };
}) => {
  const buttonStyle = {
    normal: 'bg-[#FF7E5F] text-white',
    delete: 'bg-red-500 text-white',
    disabled: 'bg-[#CCCCCC] text-[#7D7D7D]',
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className='text-[15px] font-medium'>{label}</label>
      <div className='flex items-center justify-between gap-[20px]'>
        {children ? (
          children
        ) : (
          <Input
            height={40}
            bgColor='transparent'
            className={`border border-[#838383]`}
          />
        )}
        {button?.text && (
          <button
            className={cn(
              'w-[66px] h-10 rounded-[10px]',
              buttonStyle[button?.color]
            )}
          >
            {button?.text}
          </button>
        )}
      </div>
    </div>
  );
};

SettingsSection.TextWithToggle = ({
  title,
  description,
  ...rest
}: {
  title: string;
  description: string;
  active: boolean;
  toggle: () => void;
}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-1 text-[15px]'>
        <strong className='text-black font-medium'>{title}</strong>
        <span className='text-[#7D7D7D]'>{description}</span>
      </div>
      <Toggle {...rest} />
    </div>
  );
};

export default SettingsSection;
