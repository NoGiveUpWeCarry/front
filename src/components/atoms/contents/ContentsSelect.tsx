import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const jobRoles: Record<'Programmer' | 'Artist' | 'Designer', string[]> = {
  Programmer: [
    '서버/백엔드 개발자',
    '프론트엔드 개발자',
    '웹 풀스택 개발자',
    '안드로이드 개발자',
    'IOS 개발자',
    '크로스플랫폼 앱개발자',
    '게임 클라이언트 개발자',
    '게임 서버 개발자',
    'DBA',
    '빅데이터 엔지니어',
    '인공지능/머신러닝',
    'devops/시스템 엔지니어',
    '정보보안 담당자',
    'QA 엔지니어',
    '개발 PM',
    'HW/임베디드',
    'SW/솔루션',
    '웹퍼블리셔',
    'VR/AR/3D',
    '블록체인',
  ],
  Artist: [
    '클래식',
    'JAZZ',
    'CCM',
    '팝',
    '발라드',
    '블루스',
    '힙합',
    '컨트리 뮤직',
    '포크 음악',
    '레게',
    '디스코',
    '록 음악',
    '전자 음악',
    '트로트',
    '일렉트로닉 뮤직',
    '로큰롤',
  ],
  Designer: [
    '패키지 디자이너',
    '편집 디자이너',
    '웹 디자이너',
    '전시 디자이너',
    '컬러리스트',
    '일러스트레이터',
    '캐릭터 디자이너',
    'UI/UX 디자이너',
    '광고 디자이너',
    '영상 디자이너',
  ],
};

interface HubSelectProps {
  className?: string;
  onUnitSelect?: (unit: string) => void;
}

export const HubSelect = ({ className, onUnitSelect }: HubSelectProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [workUnits, setWorkUnits] = useState<string[]>([]);

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    if (value in jobRoles) {
      setWorkUnits(jobRoles[value as keyof typeof jobRoles]);
    } else {
      setWorkUnits([]);
    }
  };

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger className={cn('w-[130px] h-[44px] bg-white', className)}>
          <SelectValue placeholder={selectedRole || '직군'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='Programmer'>Programmer</SelectItem>
            <SelectItem value='Artist'>Artist</SelectItem>
            <SelectItem value='Designer'>Designer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={onUnitSelect}>
        <SelectTrigger className={cn('w-[180px] h-[44px] bg-white', className)}>
          <SelectValue placeholder='모집단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {workUnits.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

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
  onSkillSelect: (skill: string) => void; // 선택된 스킬을 전달하는 핸들러
}

export const SkillSelect = ({ onSkillSelect }: SkillSelectProps) => {
  return (
    <Select onValueChange={onSkillSelect}>
      {/* onValueChange 연결 */}
      <SelectTrigger className='w-[330px] border-black h-[44px]'>
        <SelectValue placeholder='스킬을 선택해주세요' />
      </SelectTrigger>
      <SelectContent>
        {/* Programmer Skills */}
        <SelectGroup>
          <SelectLabel>Programmer</SelectLabel>
          {programmerSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              className='text-[#7d7d7d] text-[12px] rounded-sm'
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* Artist Skills */}
        <SelectGroup>
          <SelectLabel>Artist</SelectLabel>
          {artistSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              className='text-[#7d7d7d] text-[12px] rounded-sm'
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* Designer Skills */}
        <SelectGroup>
          <SelectLabel>Designer</SelectLabel>
          {designerSkills.map((skill) => (
            <SelectItem
              key={skill}
              value={skill}
              className='text-[#7d7d7d] text-[12px] rounded-sm'
            >
              {skill}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const SetWork = () => {
  const [, setWorkMethod] = useState<string>('');
  return (
    <Select onValueChange={setWorkMethod}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='작업 방식' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='대면'>대면</SelectItem>
        <SelectItem value='원격'>원격</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const HubCategory = () => {
  const [HubMethod, setHubMethod] = useState<string>('');

  return (
    <Select onValueChange={setHubMethod} value={HubMethod}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='허브 유형' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='Project'>프로젝트</SelectItem>
        <SelectItem value='Outsourcing'>외주</SelectItem>
      </SelectContent>
    </Select>
  );
};
