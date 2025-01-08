import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';

import HubBody from '@/components/molecules/contents/HubBody';
import { RoleProps } from '@/components/atoms/Role';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleTagProps } from '@/types/tags/roleTag.type';
import HubTitle from '@/components/molecules/contents/HubTitle';
import { ProjectTagProps } from '@/types/tags/projectTag.type';

interface HubItemProps {
  title: string;
  projectTags: { label: string; variant: ProjectTagProps['variant'] }[];
  hubTags: { label: string; variant: HubTagProps['variant'] }[];
  roleTags: { label: string; variant: RoleTagProps['variant'] }[];
  role: RoleProps['role'];
  thumbnail?: string;
  startDate: string;
  duration: string;
}

const HubItem = ({
  hubTags,
  projectTags,
  roleTags,
  role,
  thumbnail,
  title,
  startDate,
  duration,
}: HubItemProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <HubTitle projectTags={projectTags} title={title} />
      <div className='flex justify-between'>
        <HubBody
          hubTags={hubTags}
          roleTags={roleTags}
          role={role}
          startDate={startDate}
          duration={duration}
        />

        {thumbnail && (
          <div className='w-[180px]'>
            <ContentsThumbnail src={thumbnail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HubItem;
