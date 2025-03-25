import TabButton from '@/components/molecules/TabButton';
import {
  createContext,
  Fragment,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

interface TabContextType {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const TabContext = createContext<TabContextType | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabContext');
  }
  return context;
};

const TabsMain = ({ children }: PropsWithChildren) => {
  const [active, setActive] = useState(0);

  const value = useMemo(() => ({ active, setActive }), [active, setActive]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export interface TabTriggerProps {
  index: number;
}

const TabTrigger = ({
  children,
  index,
  ...rest
}: PropsWithChildren<TabTriggerProps>) => {
  const { active, setActive } = useTabContext();
  return (
    <TabButton
      isActive={active === index}
      onClick={() => setActive(index)}
      {...rest}
    >
      {children}
    </TabButton>
  );
};

interface TabPannelProps {
  index: number;
}

const TabPannel = ({ children, index }: PropsWithChildren<TabPannelProps>) => {
  const { active } = useTabContext();
  return active === index ? children : null;
};

interface TabTriggersProps {
  labels: string[];
  className?: string;
  divider?: React.ReactNode;
}

const TabTriggers = ({ labels, className, divider }: TabTriggersProps) => {
  return (
    <div className={className}>
      {labels.map((label, index, arr) => (
        <Fragment key={index}>
          <TabTrigger index={index}>{label}</TabTrigger>
          {index !== arr.length - 1 && divider}
        </Fragment>
      ))}
    </div>
  );
};

interface TabPannelsProps {
  components: React.ReactNode[];
}

const TabPannels = ({ components }: PropsWithChildren<TabPannelsProps>) => {
  return (
    <>
      {components.map((component, index) => (
        <TabPannel key={index} index={index}>
          {component}
        </TabPannel>
      ))}
    </>
  );
};

const Tabs = Object.assign(TabsMain, {
  Trigger: TabTrigger,
  Triggers: TabTriggers,
  Pannel: TabPannel,
  Pannels: TabPannels,
});

export default Tabs;
