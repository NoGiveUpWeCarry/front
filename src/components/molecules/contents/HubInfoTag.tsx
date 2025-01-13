import Role, { RoleProps } from '@/components/atoms/Role';
import Tag from '@/components/atoms/Tag';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleTagProps } from '@/types/tags/roleTag.type';

interface HubInfoTag {
  hubTags: { label: string; variant: HubTagProps['variant'] }[];
  roleTags: { label: string; variant: RoleTagProps['variant'] }[];
  role: RoleProps['role'];
}

const HubInfoTag = ({ hubTags, role }: HubInfoTag) => {
  return (
    <div className='flex gap-[20px] items-center'>
      <div className='flex'>
        <Role role={role} />
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

export default HubInfoTag;
