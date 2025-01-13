import ContentsTitle from '@/components/atoms/contents/ContentsTitle';
import Tag from '@/components/atoms/Tag';

import { ProjectTagProps } from '@/types/tags/projectTag.type';

export interface HubTitleProps {
  projectTags: { label: string; variant: ProjectTagProps['variant'] }[];
  title: string;
}

const HubTitle = ({ projectTags, title }: HubTitleProps) => {
  return (
    <div className='flex w-full gap-[20px]'>
      <div className='w-[80px] h-[25px] text-white'>
        {projectTags.map((projectTags, index) => (
          <Tag
            key={index}
            label={projectTags.label}
            type='project'
            variant={projectTags.variant}
          />
        ))}
      </div>
      <div className='flex'>
        <ContentsTitle title={title} />
      </div>
    </div>
  );
};

export default HubTitle;
