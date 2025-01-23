import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Toggle from '@/components/atoms/Toggle';
import { cn } from '@/utils/cn';
import { InputHTMLAttributes, ReactNode } from 'react';

const SettingsSection = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

SettingsSection.Title = function ({ children }: { children: ReactNode }) {
  return <h1 className='text-[25px] font-medium'>{children}</h1>;
};

SettingsSection.Description = function ({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className='mt-1 text-[16px] text-[#838383] font-normal'>
        {children}
      </h2>
      <SettingsSection.Divider />
    </>
  );
};

SettingsSection.Divider = function () {
  return <div className='w-full h-[1px] bg-[#DCDCDC] mt-[20px] mb-[30px]' />;
};

SettingsSection.Content = function ({
  children,
  gap,
}: {
  children: ReactNode;
  gap: number;
}) {
  return (
    <div className='flex flex-col' style={{ gap }}>
      {children}
    </div>
  );
};

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  value?: string;
  onSetValue?: (value: string) => void;
  children?: ReactNode;
  button?: { text: string; color: 'normal' | 'disabled'; onClick: () => void };
}

SettingsSection.InputWithLabel = function ({
  label,
  className,
  value,
  onSetValue,
  children,
  button,
  ...props
}: InputWithLabelProps) {
  const buttonStyle = {
    normal: 'bg-[#FF7E5F] text-white',
    disabled: 'bg-[#CCCCCC] text-[#7D7D7D] w-[66px] h-10',
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className='text-[15px] font-medium'>{label}</label>
      <div className='flex items-center justify-between gap-[30px]'>
        {children ? (
          children
        ) : (
          <Input
            {...props}
            height={40}
            bgColor='transparent'
            className='border border-[#838383]'
            value={value ?? ''}
            onChange={(e) => onSetValue?.(e.target.value)}
          />
        )}
        {button?.text && (
          <Button
            radius='md'
            width='66px'
            height='40px'
            className={cn('w-[66px] h-10', buttonStyle[button?.color])}
            onClick={button.onClick}
          >
            {button?.text}
          </Button>
        )}
      </div>
    </div>
  );
};

SettingsSection.TextWithToggle = function ({
  title,
  description,
  ...rest
}: {
  title: string;
  description: string;
  active: boolean;
  toggle: () => void;
}) {
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
