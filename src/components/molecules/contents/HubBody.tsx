import ContentsTime from '@/components/atoms/contents/ContentsTime';
import Role, { RoleProps } from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import {
  roleTagItems,
  roleTagItemsColors,
  roleTagItemsKey,
} from '@/constants/hub/roleTagsItems';
import {
  statusTagItemsColors,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';

interface HubBodyProps {
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: roleItemsKey;
  startDate: string;
  duration: string;
}

const HubBody = ({
  workType,
  detailRoles = [],
  role,
  startDate,
  status,
  duration,
}: HubBodyProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex w-full items-center gap-[20px]'>
        <Role role={role} />

        <div className='flex gap-[10px] items-center'>
          {detailRoles.map((detailRoles) => (
            <span
              key={detailRoles}
              className={`${roleTagItemsColors[detailRoles]} bg-[#eaeaea] inline-flex items-center px-3 py-1`}
            >
              {roleTagItems[detailRoles]}
            </span>
          ))}
        </div>
      </div>
      <div>
        <ContentsTime startDate={startDate} duration={duration} />
      </div>

      <div className='flex gap-[10px] text-white'>
        <span
          className={`${meetingTagItemsColors[workType]} inline-flex items-center px-3 py-1 font-medium`}
        >
          {workType}
        </span>
        <span
          className={`${statusTagItemsColors[status]} inline-flex items-center px-3 py-1 font-medium `}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default HubBody;
