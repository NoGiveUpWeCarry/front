import {
  skillTagItems,
  skillTagItemsKey,
  skillTagItmesColors,
} from '@/constants/hub/skillTagItems';
import { useNavigate } from 'react-router-dom';

interface HubSkillProps {
  skills: skillTagItemsKey[];
}

const HubSkill = ({ skills }: HubSkillProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-[10px] flex-wrap'>
      {skills.map((skills) => (
        <div
          key={skills}
          className={`${skillTagItmesColors[skills]} px-[10px] py-[5px] border rounded-full bg-[#eaeaea] hover:text-[#525252] hover:cursor-pointer`}
          onClick={() => {
            navigate(`/search?q=${skillTagItems[skills].slice(1)}`);
          }}
        >
          {skillTagItems[skills]}
        </div>
      ))}
    </div>
  );
};

export default HubSkill;
