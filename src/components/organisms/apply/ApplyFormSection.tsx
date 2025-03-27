import ApplyFormTextArea from '@/components/organisms/apply/ApplyFormTextArea';
import ApplyFormInput from '@/components/organisms/apply/Input';
import { ReactNode } from 'react';

const ApplyFormSection = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col gap-[17px]'>{children}</div>;
};

ApplyFormSection.Input = ApplyFormInput;
ApplyFormSection.TextArea = ApplyFormTextArea;

export default ApplyFormSection;
