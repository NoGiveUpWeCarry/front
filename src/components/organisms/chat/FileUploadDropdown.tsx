import Icon from '@/components/atoms/Icon';
import Dropdown from '@/components/molecules/Dropdown';
import { IDropdown, useDropdown } from '@/hooks/useDropdown';
import { FileUploader } from '@/hooks/useFileUpload';
import { ReactNode } from 'react';

export interface FileUploadDropdownItem extends IDropdown {
  icon: ReactNode;
  fileUploader: FileUploader;
}

interface FileUploadDropdownProps {
  options: FileUploadDropdownItem[];
}

const FileUploadDropdown = ({ options }: FileUploadDropdownProps) => {
  const { toggleDropdown, openDropdown, setSelectedOption } =
    useDropdown<FileUploadDropdownItem>({
      data: options,
      initialValue: null,
    });

  return (
    <div className='relative'>
      {openDropdown && (
        <Dropdown
          type='file'
          options={options}
          onClickDropdownItem={({ id }) =>
            setSelectedOption(
              options.find((option) => option.id === id) ?? null
            )
          }
          className='absolute right-0 bottom-[38px] w-max bg-[#a8a8a8] p-[10px] rounded-sm'
          itemClassName='text-white cursor-pointer'
        />
      )}

      <button
        className='bg-white border-gray border-[1px] text-black rounded-full w-[30px] h-[30px]'
        onClick={toggleDropdown}
      >
        <Icon type='plus' className='w-full h-full p-1' />
      </button>
    </div>
  );
};

export default FileUploadDropdown;
