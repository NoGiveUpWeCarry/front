import { IDropdown } from '@/hooks/useDropdown';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface DropdownProps<T extends IDropdown = IDropdown>
  extends Pick<HTMLAttributes<HTMLDivElement>, 'style'> {
  options: T[];
  focusedIndex?: number;
  setFocusedIndex?: (value: number) => void;
  onClickDropdownItem?: ({ id }: Pick<IDropdown, 'id'>) => void;
  className?: string;
  itemClassName?: string;
}

const Dropdown = ({
  options,
  focusedIndex,
  setFocusedIndex,
  onClickDropdownItem,
  className,
  itemClassName,
  style,
}: DropdownProps) => {
  return (
    <div
      className={cn(
        'absolute bg-white w-[220px] h-30 top-20 rounded-[10px] border border-[#838383] text-[15px] overflow-hidden h-[138px] z-10',
        className
      )}
      style={style}
    >
      <ul>
        {options.map((option, index) => (
          <li
            key={option.id}
            className={cn(
              `py-[6px] px-3 cursor-pointer ${focusedIndex === index ? 'bg-gray-200' : ''}`,
              itemClassName
            )}
            onMouseOver={() => setFocusedIndex && setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex && setFocusedIndex(-1)}
            onClick={() =>
              onClickDropdownItem && onClickDropdownItem({ id: option.id })
            }
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
