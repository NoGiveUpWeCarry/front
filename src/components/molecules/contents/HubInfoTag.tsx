import Role, { RoleProps } from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import {
  statusTagItemsColors,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';

interface HubInfoTag {
  meetingTags: meetingTagItemskey;
  statusTags: statusTagItemskey;
  role: RoleProps['role'];
}

const HubInfoTag = ({ meetingTags, statusTags, role }: HubInfoTag) => {
  return (
    <div className='flex gap-[20px] items-center'>
      <div className='flex'>
        <Role role={role} />
      </div>
      <div className='flex gap-[10px] text-white'>
        <span
          className={`${meetingTagItemsColors[meetingTags]} inline-flex items-center px-3 py-1 font-medium`}
        >
          {meetingTags}
        </span>
        <span
          className={`${statusTagItemsColors[statusTags]} inline-flex items-center px-3 py-1 font-medium `}
        >
          {statusTags}
        </span>
      </div>
    </div>
  );
};

export default HubInfoTag;
