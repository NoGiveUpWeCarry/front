import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import HubBody from '@/components/molecules/contents/HubBody';
import HubTitle from '@/components/molecules/contents/HubTitle';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface HubItemProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: roleItemsKey;
  thumbnailUrl?: string;
  startDate: string;
  duration: string;
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
}: HubItemProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <HubTitle hubTags={hubType} title={title} />
      <div className='flex justify-between'>
        <HubBody
          status={status}
          workType={workType}
          detailRoles={detailRoles}
          role={role}
          startDate={startDate}
          duration={duration}
        />
        <div className='flex'>
          <div className='w-[200px] h-[120px]'>
            <ContentsThumbnail thumbnailUrl={thumbnailUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubItem;
