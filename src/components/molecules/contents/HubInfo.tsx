import Icon from '@/components/atoms/Icon';

interface HubInfoProps {
  type: 'calendar' | 'roledetail' | 'clock' | 'workflow';
  label: string;
  value: string;
}

const HubInfo = ({ type, label, value }: HubInfoProps) => {
  return (
    <div className='flex gap-[20px] items-center'>
      <Icon type={type} color='gray' className='w-[24px] h-[24px]' />
      <div className='flex w-[200px]'>
        <span className='text-[#838383]'>{label}</span>
      </div>
      <div>
        <span className='text-black'>{value}</span>
      </div>
    </div>
  );
};

export default HubInfo;
