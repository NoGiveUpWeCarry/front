import Label from '@/components/atoms/Label';
import { useSettingsStore } from '@/store/settingsStore';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useShallow } from 'zustand/shallow';

interface JobProps {
  openJobModal: () => void;
}

const Job = ({ openJobModal }: JobProps) => {
  const [settingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm])
  );

  return (
    <div className='relative w-full mt-5'>
      <Label text='상세 직무' />
      <button
        className='border border-[#838383] rounded-[10px] h-10 bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px] w-[280px] mt-2'
        onClick={openJobModal}
      >
        {settingsForm.jobDetail ? (
          <div className='w-full flex justify-between items-center text-[15px]'>
            <span>{settingsForm.jobDetail}</span>
            <ChevronRightIcon width={16} strokeWidth={2} />
          </div>
        ) : (
          <span className='text-[15px] text-[#838383]'>
            상세 직무를 선택해주세요
          </span>
        )}
      </button>
    </div>
  );
};

export default Job;
