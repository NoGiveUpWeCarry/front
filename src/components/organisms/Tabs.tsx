import TabItem, { TabProps } from '@/components/molecules/TabItem';
import { useTabsStore } from '@/store/tabStore';
import { Children, isValidElement, ReactElement, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const Tabs = ({ children }: TabProps) => {
  const [setTabs, setActiveTab] = useTabsStore(
    useShallow((state) => [state.setTabs, state.setActiveTab])
  );

  useEffect(() => {
    const tabs = Children.toArray(children)
      .filter((el): el is ReactElement => isValidElement(el))
      .map((el) => el.props.children);
    setTabs(tabs);
    setActiveTab(tabs[0]);
  }, []);

  return (
    <div className='w-full h-[38px] px-[5px] flex items-center bg-[#DCDCDC] rounded-[5px]'>
      {children}
    </div>
  );
};

Tabs.TabItem = TabItem;

export default Tabs;
