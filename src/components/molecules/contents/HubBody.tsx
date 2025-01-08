import ContentsTime from '@/components/atoms/contents/ContentsTime';
import Role, { RoleProps } from '@/components/atoms/Role';
import Tag from '@/components/atoms/Tag';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleTagProps } from '@/types/tags/roleTag.type';

interface HubBodyProps {
  hubTags: { label: string; variant: HubTagProps['variant'] }[];
  roleTags: { label: string; variant: RoleTagProps['variant'] }[];
  role: RoleProps['role'];
  startDate: string;
  duration: string;
}

const HubBody = ({
  hubTags,
  roleTags,
  role,
  startDate,
  duration,
}: HubBodyProps) => {
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='flex w-full gap-[20px]'>
        <Role role={role} />

        <div className='flex gap-[10px]'>
          {roleTags.map((roleTag, index) => (
            <Tag
              key={index}
              label={roleTag.label}
              type='role'
              variant={roleTag.variant}
            />
          ))}
        </div>
      </div>
      <div>
        <ContentsTime startDate={startDate} duration={duration} />
      </div>

      <div className='flex gap-[10px] text-white'>
        {hubTags.map((hubTag, index) => (
          <Tag
            key={index}
            label={hubTag.label}
            type='hub'
            variant={hubTag.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default HubBody;
