import ContentsTime from '@/components/atoms/contents/ContentsTime';
import Role, { RoleProps } from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
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
  meetingTags: meetingTagItemskey;
  roleTags: roleTagItemsKey[];
  statusTags: statusTagItemskey;
  role: RoleProps['role'];
  startDate: string;
  duration: string;
}

const HubBody = ({
  meetingTags,
  roleTags,
  role,
  startDate,
  statusTags,
  duration,
}: HubBodyProps) => {
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='flex w-full gap-[20px]'>
        <Role role={role} />

        <div className='flex gap-[10px]'>
          {roleTags.map((roleTag) => (
            <span
              key={roleTag}
              className={`${roleTagItemsColors[roleTag]} bg-[#eaeaea] inline-flex items-center px-3 py-1`}
            >
              {roleTagItems[roleTag]}
            </span>
          ))}
        </div>
      </div>
      <div>
        <ContentsTime startDate={startDate} duration={duration} />
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

export default HubBody;
