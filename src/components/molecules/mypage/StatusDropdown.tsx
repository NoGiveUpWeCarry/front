import Label from '@/components/atoms/Label';
import Dropdown from '@/components/molecules/Dropdown';
import { STATUS_EMOJI } from '@/constants/userStatus';
import {
  successHandler,
  useUpdateStatus,
} from '@/hooks/queries/mypage/settings';
import { IDropdown, useDropdown } from '@/hooks/useDropdown';
import { useSettingsStore } from '@/store/settingsStore';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const StatusDropdown = () => {
  const options: IDropdown[] = STATUS_EMOJI;

  const {
    openDropdown,
    onClickOption,
    selectedOption,
    setSelectedOption,
    toggleDropdown,
    // onKeyDown,
    // focusedIndex,
    // setFocusedIndex,
  } = useDropdown({ data: options, initialValue: options[0] });

  const [settingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm])
  );
  console.log({ selectedOption });
  useEffect(() => {
    if (settingsForm.status) {
      setSelectedOption(
        options.find((el) => el.label.includes(settingsForm.status))!
      );
    }
  }, [settingsForm]);

  const { mutate } = useUpdateStatus();

  const handleClickItem = ({ statusId }: Pick<IDropdown, 'statusId'>) => {
    if (!statusId) return;
    mutate(
      { statusId },
      {
        onSuccess: () => {
          successHandler();
          onClickOption();
        },
      }
    );
  };

  return (
    <div className='relative'>
      <Label text='상태' />
      <button
        className='mt-2 border border-[#838383] rounded-[10px] h-10 w-[220px] bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px]'
        onClick={toggleDropdown}
      >
        <span className='text-[15px]'>{selectedOption?.label}</span>
        <ChevronDownIcon width={20} color='#838383' />
      </button>
      {openDropdown && (
        <Dropdown
          options={options}
          // focusedIndex={focusedIndex!}
          // setFocusedIndex={setFocusedIndex}
          onClickDropdownItem={handleClickItem}
        />
      )}
    </div>
  );
};

export default StatusDropdown;
