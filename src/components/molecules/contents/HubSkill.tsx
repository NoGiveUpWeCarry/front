import {
  skillTagItems,
  skillTagItemsKey,
  skillTagItmesColors,
} from '@/constants/hub/skillTagItems';

interface HubSkillProps {
  skillTags: skillTagItemsKey[];
}

const HubSkill = ({ skillTags }: HubSkillProps) => {
  return (
    <div className='flex gap-[10px] flex-wrap'>
      {skillTags.map((skillTag) => (
        <div
          key={skillTag}
          className={`${skillTagItmesColors[skillTag]} px-[10px] py-[5px] border rounded-full bg-[#eaeaea]`}
        >
          {skillTagItems[skillTag]}
        </div>
      ))}
    </div>
  );
};

export default HubSkill;
