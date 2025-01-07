import Input from '@/components/atoms/Input';
import { ReactNode } from 'react';

const SettingsSection = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

SettingsSection.Title = ({ children }: { children: ReactNode }) => {
  return <h1 className='text-[35px] font-medium'>{children}</h1>;
};

SettingsSection.Description = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h2 className='mt-[10px] text-[20px] text-[#838383] font-normal'>
        {children}
      </h2>
      <div className='w-full h-[1px] bg-[#DCDCDC] my-[10px]' />
    </>
  );
};

SettingsSection.Content = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

SettingsSection.InputWithLabel = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className='text-[15px] font-medium'>{label}</label>
      {children ? (
        children
      ) : (
        <Input
          height={40}
          bgColor='transparent'
          className='border border-[#838383]'
        />
      )}
    </div>
  );
};

SettingsSection.TextWithToggle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-2 text-[15px]'>
        <strong className='text-black'>{title}</strong>
        <span className='text-[#7D7D7D]'>{description}</span>
      </div>
    </div>
  );
};

export default SettingsSection;
