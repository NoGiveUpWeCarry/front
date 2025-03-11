import Icon from '@/components/atoms/Icon';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { useNavigate } from 'react-router-dom';

export interface HubInfoProps {
  startDate: string;
  duration: string;
  workType: meetingTagItemskey;
  role: RoleItemKeys;
  detailRoles: roleTagItemsKey[];
}

const HubInfo = ({
  startDate,
  duration,
  workType,
  role,
  detailRoles,
}: HubInfoProps) => {
  const navigate = useNavigate();

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex gap-[20px] items-center'>
        <Icon type='calendar' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[80px] md:w-[100px]'>
          <span className='text-[#838383] text-[14px]'>시작 예정일</span>
        </div>
        <span className='text-black text-[14px]'>{formatDate(startDate)}</span>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='roledetail' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[80px] md:w-[100px]'>
          <span className='text-[#838383] text-[14px]'>직무</span>
        </div>
        <div className='flex'>
          <span className='flex text-black gap-[20px] text-[14px] items-center'>
            <div className='flex flex-col gap-[10px] overflow-hidden md:flex-row'>
              {detailRoles.map((tag, index) => (
                <div
                  key={tag}
                  className='hover:text-[#525252] hover:cursor-pointer whitespace-nowrap'
                  onClick={() => {
                    navigate(`/search?q=${tag}`);
                  }}
                >
                  {tag}
                  {index !== detailRoles.length - 1}
                </div>
              ))}
            </div>
          </span>
        </div>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='clock' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[80px] md:w-[100px]'>
          <span className='text-[#838383] text-[14px]'>예상 기간</span>
        </div>
        <div>
          <span className='text-black text-[14px]'>{duration}</span>
        </div>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='workflow' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[80px] md:w-[100px]'>
          <span className='text-[#838383] text-[14px]'>작업방식</span>
        </div>
        <div>
          <span className='text-black text-[14px]'>{workType}</span>
        </div>
      </div>
    </div>
  );
};

export default HubInfo;
