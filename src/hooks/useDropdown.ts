import { useState } from 'react';

export interface IDropdown {
  id: number;
  label: string;
}

export const useDropdown = <T extends IDropdown = IDropdown>({
  data,
  initialValue,
}: {
  data: T[];
  initialValue: T | null;
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const onClickOption = ({ id }: Pick<IDropdown, 'id'>) => {
    setSelectedOption(data.find((el) => el.id === id) ?? null);
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
    setOpenDropdown,
  };
};
