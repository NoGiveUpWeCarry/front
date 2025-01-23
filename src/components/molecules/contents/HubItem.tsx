import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import HubBody from '@/components/molecules/contents/HubBody';
import { RoleProps } from '@/components/atoms/Role';
import HubTitle from '@/components/molecules/contents/HubTitle';
import { hubTagItemskey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface HubItemProps {
  title: string;
  hubTags: hubTagItemskey;
  meetingTags: meetingTagItemskey;
  roleTags: roleTagItemsKey[];
  statusTags: statusTagItemskey;
  role: RoleProps['role'];
  thumbnailUrl?: string;
  startDate: string;
  duration: string;
}

const HubItem = ({
  hubTags,
  meetingTags,
  roleTags,
  statusTags,
  role,
  thumbnailUrl,
  title,
  startDate,
  duration,
}: HubItemProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <HubTitle hubTags={hubTags} title={title} />
      <div className='flex justify-between'>
        <HubBody
          statusTags={statusTags}
          meetingTags={meetingTags}
          roleTags={roleTags}
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
