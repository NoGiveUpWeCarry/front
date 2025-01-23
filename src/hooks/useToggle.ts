import { useState } from 'react';

export const useToggle = <T extends object>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue);

  const toggle = (key: keyof T, fn?: () => void) => {
    setValues((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    fn?.();
  };

  return {
    values,
    setValues,
    toggle,
  };
};
