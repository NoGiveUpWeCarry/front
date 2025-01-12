import { useState } from 'react';

export const useToggle = (initialValue: Record<string, boolean> = {}) => {
  const [values, setValues] = useState(initialValue);

  const toggle = (key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return {
    values,
    toggle,
  };
};
