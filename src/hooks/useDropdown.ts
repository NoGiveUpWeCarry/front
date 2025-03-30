import { PropsWithChildren, useState } from 'react';

export interface IDropdown extends PropsWithChildren {
  id: number;
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
  const [selectedOption, selectOption] = useState(initialValue);

  const onClickOption = ({ id }: Pick<IDropdown, 'id'>) => {
    selectOption(data.find((el) => el.id === id) ?? null);
    setOpenDropdown(false);
  };

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  return {
    focusedIndex,
    openDropdown,
    selectedOption,
    selectOption,
    onClickOption,
    toggleDropdown,
    setFocusedIndex,
    setOpenDropdown,
  };
};
