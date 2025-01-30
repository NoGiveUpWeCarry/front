import { useState } from 'react';

export interface IDropdown {
  id: number;
  label: string;
}

export const useDropdown = <T = IDropdown>({
  data,
  initialValue,
}: {
  data: T[];
  initialValue: T;
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const onClickOption = () => {
    setSelectedOption(data[focusedIndex!]);
    setOpenDropdown(false);
  };

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  return {
    focusedIndex,
    openDropdown,
    selectedOption,
    setSelectedOption,
    onClickOption,
    toggleDropdown,
    setFocusedIndex,
  };
};
