import { useState } from 'react';

export const useDropdown = ({
  data,
  initialValue,
}: {
  data: string[];
  initialValue: string;
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else if (event.key === 'Enter' && focusedIndex !== null) {
      handleSetWorkStatus();
    }
  };

  const handleSetWorkStatus = () => {
    setSelectedOption(data[focusedIndex!]);
    setOpenDropdown(false);
  };

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  return {
    focusedIndex,
    openDropdown,
    selectedOption,
    setSelectedOption,
    onClickOption: handleSetWorkStatus,
    onKeyDown: handleKeyDown,
    toggleDropdown,
    setFocusedIndex,
  };
};
