import Icon from '@/components/atoms/Icon';
import { RoleProps } from '@/components/atoms/Role';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';

export interface HubInfoProps {
  startDate: string;
  duration: string;
  meetingTags: meetingTagItemskey;
  role: RoleProps['role'];
  roleTags: roleTagItemsKey[];
}

const HubInfo = ({
  startDate,
  duration,
  meetingTags,
  role,
  roleTags,
}: HubInfoProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex gap-[20px] items-center'>
        <Icon type='calendar' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[200px]'>
          <span className='text-[#838383]'>시작 예정일</span>
        </div>
        <div>
          <span className='text-black'>{startDate}</span>
        </div>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='roledetail' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[200px]'>
          <span className='text-[#838383]'>직무</span>
        </div>
        <div className='flex'>
          <span className='flex text-black gap-[10px]'>
            {role}
            <div className='flex gap-[10px]'>&gt;</div>
            <div className='flex gap-[10px]'>
              {roleTags.map((tag, index) => (
                <div key={index}>
                  {tag}
                  {index !== roleTags.length - 1 && ','}
                </div>
              ))}
            </div>
          </span>
        </div>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='clock' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[200px]'>
          <span className='text-[#838383]'>예상 기간</span>
        </div>
        <div>
          <span className='text-black'>{duration}</span>
        </div>
      </div>
      <div className='flex gap-[20px] items-center'>
        <Icon type='workflow' color='gray' className='w-[24px] h-[24px]' />
        <div className='flex w-[200px]'>
          <span className='text-[#838383]'>작업방식</span>
        </div>
        <div>
          <span className='text-black'>{meetingTags}</span>
        </div>
      </div>
    </div>
  );
};

export default HubInfo;
