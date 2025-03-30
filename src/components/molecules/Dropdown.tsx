import { IDropdown } from '@/hooks/useDropdown';
import { HTMLAttributes } from 'react';

interface DropdownProps<T extends IDropdown = IDropdown>
  extends Pick<HTMLAttributes<HTMLDivElement>, 'style'> {
  options?: T[];
  onClickDropdownItem?: ({ id }: Pick<IDropdown, 'id'>) => void;
  className?: string;
  itemClassName?: string;
}

const Dropdown = ({
  options,
  onClickDropdownItem,
  className,
  itemClassName,
  style,
}: DropdownProps) => {
  return (
    <div className={className} style={style}>
      <ul>
        {options?.map((option) => (
          <li
            key={option.id}
            className={itemClassName}
            onClick={() => {
              if (onClickDropdownItem) onClickDropdownItem({ id: option.id });
            }}
          >
            {option.children}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
