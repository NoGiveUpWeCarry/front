import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

const programmerSkills = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express.js',
  'Python',
  'Django',
  'Flask',
  'Ruby on Rails',
  'Java',
  'Spring Boot',
  'C++',
  'C#',
  'Go',
  'Rust',
  'GraphQL',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Docker',
];

const artistSkills = [
  'Music Theory',
  'Audio Mixing',
  'Audio Mastering',
  'Sound Design',
  'Composing',
  'Arranging',
  'Music Production',
  'Digital Audio Workstations (DAWs)',
  'Ableton Live',
  'FL Studio',
  'Logic Pro',
  'Pro Tools',
  'Cubase',
  'Melodyne',
  'Sampling',
  'MIDI Programming',
  'Synthesizers',
  'Vocal Tuning',
  'Field Recording',
  'Game Audio Implementation',
];

const designerSkills = [
  'UX/UI Design',
  'Visual Design',
  'Wireframing',
  'Prototyping',
  'Interaction Design',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe XD',
  'Figma',
  'Sketch',
  'Motion Graphics',
  'After Effects',
  'Brand Identity Design',
  'Typography',
  '3D Modeling',
  'Blender',
  'Cinema 4D',
  'Web Design',
  'Responsive Design',
  'Design Systems',
];

interface SkillSelectProps {
  onSkillSelect: (skill: string) => void;
  selectedSkills: string[];
}

const SkillSelect = ({ onSkillSelect, selectedSkills }: SkillSelectProps) => {
  return (
    <Select onValueChange={onSkillSelect}>
      <SelectTrigger className='w-[330px] border-black h-[44px]'>
        <SelectValue placeholder='스킬을 선택해주세요' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Programmer</SelectLabel>
          {programmerSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              disabled={selectedSkills.includes(skill)}
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Artist</SelectLabel>
          {artistSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              disabled={selectedSkills.includes(skill)}
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Designer</SelectLabel>
          {designerSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              disabled={selectedSkills.includes(skill)}
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SkillSelect;
