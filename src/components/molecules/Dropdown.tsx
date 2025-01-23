interface DropdownProps {
  options: string[];
  focusedIndex: number;
  setFocusedIndex: (value: number) => void;
  onClickDropdownItem: (index: number) => void;
}

const Dropdown = ({
  options,
  focusedIndex,
  setFocusedIndex,
  onClickDropdownItem,
}: DropdownProps) => {
  return (
    <div className='absolute bg-white w-[220px] h-30 top-20 rounded-[10px] border border-[#838383] text-[15px] overflow-hidden h-[138px] z-10'>
      <ul>
        {options.map((option, index) => (
          <li
            key={option}
            className={`py-[6px] px-3 cursor-pointer ${focusedIndex === index ? 'bg-gray-200' : ''}`}
            onMouseOver={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(-1)}
            onClick={() => onClickDropdownItem(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
