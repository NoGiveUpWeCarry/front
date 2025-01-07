import TabsButton from '@/components/atoms/TabsButton';
import VerticalDivider from '@/components/atoms/VerticalDivider';
import { useTabsStore } from '@/store/tabStore';
import { ReactNode } from 'react';
import { useShallow } from 'zustand/shallow';

export interface TabProps {
  children: ReactNode;
}

const TabItem = ({
  children,
  hideDivider,
}: TabProps & { hideDivider?: boolean }) => {
  const [activeTab, setActiveTab] = useTabsStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const child = children as string;

  return (
    <>
      <TabsButton
        isActive={activeTab === child}
        onClick={() => setActiveTab(child)}
      >
        {children}
      </TabsButton>
      {!hideDivider && <VerticalDivider />}
    </>
  );
};

export default TabItem;
