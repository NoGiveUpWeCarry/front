import HubContentsThumbnail from '@/components/molecules/hub/HubContentsThumbnail';
import HubTitle from '@/components/molecules/hub/HubTitle';
import HubBody from '@/components/organisms/hub/HubBody';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import { useNavigate } from 'react-router-dom';

interface HubItemProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: RoleItemKeys;
  thumbnailUrl?: string;
  startDate: string;
  duration: string;
  projectId: number;
}
const HubItem = ({
  hubType,
  workType,
  detailRoles,
  status,
  role,
  thumbnailUrl,
  title,
  startDate,
  duration,
  projectId,
}: HubItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col gap-[20px] cursor-pointer'
      onClick={() => navigate(`/projects/${projectId}`)}
    >
      <HubTitle hubType={hubType} title={title} />
      <div className='flex flex-col gap-[20px]'>
        <div className='w-full '>
          <HubContentsThumbnail thumbnailUrl={thumbnailUrl} />
        </div>
        <HubBody
          status={status}
          workType={workType}
          detailRoles={detailRoles}
          role={role}
          startDate={startDate}
          duration={duration}
        />
      </div>
    </div>
  );
};

export default HubItem;
