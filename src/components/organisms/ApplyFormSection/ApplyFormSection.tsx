import ApplyFormTextArea from '@/components/organisms/ApplyFormSection/ApplyFormTextArea';
import ApplyFormInput from '@/components/organisms/ApplyFormSection/Input';
import { ReactNode } from 'react';

const ApplyFormSection = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col gap-[17px]'>{children}</div>;
};

ApplyFormSection.Input = ApplyFormInput;
ApplyFormSection.TextArea = ApplyFormTextArea;

export default ApplyFormSection;
