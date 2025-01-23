import TabItem from '@/components/molecules/TabItem';
import { PropsWithChildren } from 'react';

const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full h-[38px] px-[5px] flex items-center bg-[#DCDCDC] rounded-[5px]'>
      {children}
    </div>
  );
};

Tabs.TabItem = TabItem;

export default Tabs;
