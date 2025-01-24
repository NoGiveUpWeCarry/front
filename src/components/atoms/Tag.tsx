import React from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { RoleTagVariant } from '@/types/tags/roleTag.type';
import { HubTagVariant } from '@/types/tags/hubTag.type';
import { MeetingTagVariant } from '@/types/tags/meetingTag.type';
import { ContentsFeedTagVariant } from '@/types/tags/contentsFeedTag.type';
import { HubSkillTagVariant } from '@/types/tags/hubSkillTag.type';
import { StatusTagVariant } from '@/types/tags/statusTag.type';

interface RoleTagProps {
  type: 'roleTag';
  label: string;
  variant?: RoleTagVariant;
}

interface StatusTagProps {
  type: 'statusTag';
  label: string;
  variant: StatusTagVariant;
}

interface HubTagProps {
  type: 'hubTag';
  label: string;
  variant: HubTagVariant;
}

interface MeetingTagProps {
  type: 'meetingTag';
  label: string;
  variant: MeetingTagVariant;
}

interface ContentsFeedTagProps {
  type: 'contentsFeed';
  label: string;
  variant: ContentsFeedTagVariant;
}

interface HubSkillTagProps {
  type: 'skillTag';
  label: string;
  variant: HubSkillTagVariant;
}

type TagProps =
  | RoleTagProps
  | HubTagProps
  | MeetingTagProps
  | ContentsFeedTagProps
  | StatusTagProps
  | HubSkillTagProps;

const tagStyles = cva(
  'inline-flex items-center px-3 py-1 text-[12px] font-medium rounded-full',
  {
    variants: {
      type: {
        roleTag: 'bg-[#eaeaea]',
        meetingTag: '',
        statusTag: '',
        hubTag: '',
        contentsFeed: '',
        skillTag: 'bg-[#EAEAEA]',
      },
      variant: {
        고민: 'bg-[#CDF4FF] text-[#729CFF] px-2 text-[12px] rounded-[5px]',
        회고: 'bg-[#FFCDCD] text-[#FF5E5E] px-2 text-[12px] rounded-[5px]',
        아이디어: 'bg-[#ECD1FF] text-[#AA5DFF] px-2 text-[12px] rounded-[5px]',
        계획: 'bg-[#D6FFD4] text-[#4BBF47] px-2  text-[12px] rounded-[5px]',
        토론: 'bg-[#D7E3FF] text-[#5870FF] px-2 text-[12px] rounded-[5px]',
        정보공유: 'bg-[#FFD4F4] text-[#FF5EA2] px-2 text-[12px] rounded-[5px]',
        추천: 'bg-[#F5E4D2] text-[#D69655] px-2  text-[12px] rounded-[5px]',
        질문: 'bg-[#FFE7D4] text-[#FF9F5E] px-2 text-[12px] rounded-[5px]',

        // hubTag
        PROJECT:
          'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE] text-[14px] rounded-full',
        OUTSOURCING:
          'bg-gradient-to-r from-[#FF8800] to-[#84FF74] text-[14px] rounded-full',

        // meetingTag
        ONLINE:
          'bg-gradient-to-r from-[#039160] to-[#96FFDA] text-[14px] rounded-full',
        OFFLINE:
          'bg-gradient-to-r from-[#FF383B] to-[#FFBCBD] text-[14px] rounded-full',

        // statusTag
        OPEN: 'bg-gradient-to-r from-[#9340FF] to-[#FFDCDC] text-[14px] rounded-full',
        CLOSE:
          'bg-gradient-to-r from-[#000000] to-[#FFFFFF] text-[14px] rounded-full',

        // roleTag
        '서버/백엔드 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '프론트엔드 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '웹 풀스택 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '안드로이드 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        'IOS 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '크로스플랫폼 앱개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '게임 클라이언트 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        '게임 서버 개발자': 'text-[#7d7d7d] text-[12px] rounded-full',
        DBA: 'text-[#7d7d7d] text-[12px] rounded-full',
        '빅데이터 엔지니어': 'text-[#7d7d7d] text-[12px] rounded-full',
        '인공지능/머신러닝': 'text-[#7d7d7d] text-[12px] rounded-full',
        'devops/시스템 엔지니어': 'text-[#7d7d7d] text-[12px] rounded-full',
        '정보보안 담당자': 'text-[#7d7d7d] text-[12px] rounded-full',
        'QA 엔지니어': 'text-[#7d7d7d] text-[12px] rounded-full',
        '개발 PM': 'text-[#7d7d7d] text-[12px] rounded-full',
        'HW/임베디드': 'text-[#7d7d7d] text-[12px] rounded-full',
        'SW/솔루션': 'text-[#7d7d7d] text-[12px] rounded-full',
        웹퍼블리셔: 'text-[#7d7d7d] text-[12px] rounded-full',
        'VR/AR/3D': 'text-[#7d7d7d] text-[12px] rounded-full',
        블록체인: 'text-[#7d7d7d] text-[12px] rounded-full',
        'CI/BI 로고 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '광고 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '게임 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '서체 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '웹 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        'UI/UX 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '영상 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        일러스트레이터: 'text-[#7d7d7d] text-[12px] rounded-full',
        '캐릭터 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '편집 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '패키지 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        '전시 디자이너': 'text-[#7d7d7d] text-[12px] rounded-full',
        컬러리스트: 'text-[#7d7d7d] text-[12px] rounded-full',
        클래식: 'text-[#7d7d7d] text-[12px] rounded-full',
        JAZZ: 'text-[#7d7d7d] text-[12px] rounded-full',
        CCM: 'text-[#7d7d7d] text-[12px] rounded-full',
        팝: 'text-[#7d7d7d] text-[12px] rounded-full',
        발라드: 'text-[#7d7d7d] text-[12px] rounded-full',
        블루스: 'text-[#7d7d7d] text-[12px] rounded-full',
        힙합: 'text-[#7d7d7d] text-[12px] rounded-full',
        '컨트리 뮤직': 'text-[#7d7d7d] text-[12px] rounded-full',
        '포크 음악': 'text-[#7d7d7d] text-[12px] rounded-full',
        레게: 'text-[#7d7d7d] text-[12px] rounded-full',
        디스코: 'text-[#7d7d7d] text-[12px] rounded-full',
        '록 음악': 'text-[#7d7d7d] text-[12px] rounded-full',
        '전자 음악': 'text-[#7d7d7d] text-[12px] rounded-full',
        트로트: 'text-[#7d7d7d] text-[12px] rounded-full',
        '일렉트로닉 뮤직': 'text-[#7d7d7d] text-[12px] rounded-full',
        로큰롤: 'text-[#7d7d7d] text-[12px] rounded-full',

        // 프로그래머 스킬
        React: 'text-[#7d7d7d] text-[12px] rounded-full',
        TypeScript: 'text-[#7d7d7d] text-[12px] rounded-full',
        JavaScript: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Node.js': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Express.js': 'text-[#7d7d7d] text-[12px] rounded-full',
        Python: 'text-[#7d7d7d] text-[12px] rounded-full',
        Django: 'text-[#7d7d7d] text-[12px] rounded-full',
        Flask: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Ruby on Rails': 'text-[#7d7d7d] text-[12px] rounded-full',
        Java: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Spring Boot': 'text-[#7d7d7d] text-[12px] rounded-full',
        'C++': 'text-[#7d7d7d] text-[12px] rounded-full',
        'C#': 'text-[#7d7d7d] text-[12px] rounded-full',
        Go: 'text-[#7d7d7d] text-[12px] rounded-full',
        Rust: 'text-[#7d7d7d] text-[12px] rounded-full',
        GraphQL: 'text-[#7d7d7d] text-[12px] rounded-full',
        MongoDB: 'text-[#7d7d7d] text-[12px] rounded-full',
        MySQL: 'text-[#7d7d7d] text-[12px] rounded-full',
        PostgreSQL: 'text-[#7d7d7d] text-[12px] rounded-full',
        Docker: 'text-[#7d7d7d] text-[12px] rounded-full',

        // 아티스트 스킬
        'Music Theory': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Audio Mixing': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Audio Mastering': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Sound Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        Composing: 'text-[#7d7d7d] text-[12px] rounded-full',
        Arranging: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Music Production': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Digital Audio Workstations (DAWs)':
          'text-[#7d7d7d] text-[12px] rounded-full',
        'Ableton Live': 'text-[#7d7d7d] text-[12px] rounded-full',
        'FL Studio': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Logic Pro': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Pro Tools': 'text-[#7d7d7d] text-[12px] rounded-full',
        Cubase: 'text-[#7d7d7d] text-[12px] rounded-full',
        Melodyne: 'text-[#7d7d7d] text-[12px] rounded-full',
        Sampling: 'text-[#7d7d7d] text-[12px] rounded-full',
        'MIDI Programming': 'text-[#7d7d7d] text-[12px] rounded-full',
        Synthesizers: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Vocal Tuning': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Field Recording': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Game Audio Implementation': 'text-[#7d7d7d] text-[12px] rounded-full',

        // 디자이너 스킬
        'UX/UI Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Visual Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        Wireframing: 'text-[#7d7d7d] text-[12px] rounded-full',
        Prototyping: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Interaction Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Adobe Photoshop': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Adobe Illustrator': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Adobe XD': 'text-[#7d7d7d] text-[12px] rounded-full',
        Figma: 'text-[#7d7d7d] text-[12px] rounded-full',
        Sketch: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Motion Graphics': 'text-[#7d7d7d] text-[12px] rounded-full',
        'After Effects': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Brand Identity Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        Typography: 'text-[#7d7d7d] text-[12px] rounded-full',
        '3D Modeling': 'text-[#7d7d7d] text-[12px] rounded-full',
        Blender: 'text-[#7d7d7d] text-[12px] rounded-full',
        'Cinema 4D': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Web Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Responsive Design': 'text-[#7d7d7d] text-[12px] rounded-full',
        'Design Systems': 'text-[#7d7d7d] text-[12px] rounded-full',
      },
    },

    defaultVariants: {
      type: 'roleTag',
    },
  }
);

const Tag: React.FC<TagProps> = ({ label, type, variant }) => {
  return <span className={cn(tagStyles({ type, variant }))}>{label}</span>;
};

export default Tag;
