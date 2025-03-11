import Role from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import {
  statusTagItemsColors,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';

interface HubInfoTagProps {
  workType: meetingTagItemskey;
  status: statusTagItemskey;
  role: RoleItemKeys;
}

const HubInfoTag = ({ workType, status, role }: HubInfoTagProps) => {
  return (
    <div className='flex gap-[20px] items-center'>
      <div className='flex'>
        <Role role={role} />
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

export default HubInfoTag;
