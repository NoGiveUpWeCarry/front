import { IDropdown } from '@/hooks/useDropdown';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import FileUploadButton from '@/components/molecules/FileUploadButton';
import { FileUploadDropdownItem } from '@/components/organisms/chat/FileUploadDropdown';

interface DropdownProps<T extends IDropdown = IDropdown>
  extends Pick<HTMLAttributes<HTMLDivElement>, 'style'> {
  options?: T[];
  focusedIndex?: number;
  setFocusedIndex?: (value: number) => void;
  onClickDropdownItem?: ({ id }: Pick<IDropdown, 'id'>) => void;
  className?: string;
  itemClassName?: string;
  type: 'status' | 'file';
}

const Dropdown = ({
  options,
  focusedIndex,
  setFocusedIndex,
  onClickDropdownItem,
  className,
  itemClassName,
  style,
  type,
}: DropdownProps) => {
  return (
    <div
      className={clsx(
        className ??
          'absolute bg-white w-[220px] h-30 top-20 rounded-[10px] border border-[#838383] text-[15px] overflow-hidden h-[138px] z-10'
      )}
      style={style}
    >
      <ul>
        {options?.map((option, index) => (
          <li
            key={option.id}
            className={clsx(
              itemClassName ??
                `py-[6px] px-3 cursor-pointer ${focusedIndex === index ? 'bg-gray-200' : ''}`
            )}
            onMouseOver={() => setFocusedIndex && setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex && setFocusedIndex(-1)}
            onClick={() =>
              onClickDropdownItem && onClickDropdownItem({ id: option.id })
            }
          >
            {type === 'status' && option.label}
            {type === 'file' && (
              <FileUploadButton
                className='cursor-pointer text-white'
                accept={(option as FileUploadDropdownItem).fileUploader.accept}
                onChange={
                  (option as FileUploadDropdownItem).fileUploader
                    .handleFileChange
                }
              >
                <label className='cursor-pointer w-full h-full flex justify-center items-center gap-3'>
                  <div>{(option as FileUploadDropdownItem).icon}</div>
                  <div>{option.label}</div>
                </label>
              </FileUploadButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
