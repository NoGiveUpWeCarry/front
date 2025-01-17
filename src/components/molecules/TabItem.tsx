import TabsButton from '@/components/atoms/TabsButton';
import VerticalDivider from '@/components/atoms/VerticalDivider';
import { PropsWithChildren } from 'react';

export interface TabProps {
  hideDivider?: boolean;
  isActive: boolean;
  onClick: () => void;
}

const TabItem = ({
  hideDivider,
  children,
  ...rest
}: PropsWithChildren<TabProps>) => {
  return (
    <>
      <TabsButton {...rest}>{children}</TabsButton>
      {!hideDivider && <VerticalDivider />}
    </>
  );
};

export default TabItem;
