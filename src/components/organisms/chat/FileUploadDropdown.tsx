import Icon from '@/components/atoms/Icon';
import Dropdown from '@/components/molecules/Dropdown';
import FileUploadButton from '@/components/molecules/FileUploadButton';
import { IDropdown } from '@/hooks/useDropdown';
import { useMemo, useState } from 'react';

const DropdownToggle = ({ toggleDropdown }: { toggleDropdown: () => void }) => {
  return (
    <button
      className='bg-white border-gray border-[1px] text-black rounded-full w-[30px] h-[30px]'
      onClick={toggleDropdown}
    >
      <Icon type='plus' className='w-full h-full p-1' />
    </button>
  );
};

const FileUploadDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChange = () => {
    setOpenDropdown(false);
  };

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const options: IDropdown[] = useMemo(
    () => [
      {
        id: 1,
        children: (
          <FileUploadButton
            className='cursor-pointer text-white '
            accept='image/png, image/jpg, image/jpeg, image/gif'
            onChange={handleChange}
          >
            <div className='w-full h-full flex justify-center items-center gap-3'>
              <div>
                <Icon
                  type='photo'
                  className='w-[30px] h-[30px]'
                  color='white'
                />
              </div>
              <div>이미지 업로드</div>
            </div>
          </FileUploadButton>
        ),
      },
    ],
    []
  );

  return (
    <div className='relative'>
      {openDropdown && (
        <Dropdown
          options={options}
          className='absolute right-0 bottom-[38px] w-max bg-[#a8a8a8] p-[10px] rounded-sm'
          itemClassName='text-white cursor-pointer'
        />
      )}

      <DropdownToggle toggleDropdown={toggleDropdown} />
    </div>
  );
};

export default FileUploadDropdown;
