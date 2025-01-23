import { useState } from 'react';

export const useTabs = (initialTabs: string[]) => {
  const [active, setActive] = useState(initialTabs[0]);

  return {
    tabs: initialTabs,
    active,
    setActive,
  };
};
