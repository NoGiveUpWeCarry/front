import {
  skillTagItems,
  skillTagItemsKey,
  skillTagItmesColors,
} from '@/constants/hub/skillTagItems';

interface HubSkillProps {
  skills: skillTagItemsKey[];
}

const HubSkill = ({ skills }: HubSkillProps) => {
  return (
    <div className='flex gap-[10px] flex-wrap'>
      {skills.map((skills) => (
        <div
          key={skills}
          className={`${skillTagItmesColors[skills]} px-[10px] py-[5px] border rounded-full bg-[#eaeaea]`}
        >
          {skillTagItems[skills]}
        </div>
      ))}
    </div>
  );
};

export default HubSkill;
