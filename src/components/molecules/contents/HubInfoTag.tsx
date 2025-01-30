import Role, { RoleProps } from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import {
  statusTagItemsColors,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';

interface HubInfoTag {
  workType: meetingTagItemskey;
  status: statusTagItemskey;
  role: roleItemsKey;
}

const HubInfoTag = ({ workType, status, role }: HubInfoTag) => {
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
