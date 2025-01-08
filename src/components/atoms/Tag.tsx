import React from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import {
  RoleTagVariant,
  ProjectTagVariant,
  HubTagVariant,
  ContentsFeedTagVariant,
} from '@/types/tags/index.tag';

interface RoleTagProps {
  type: 'role';
  label: string;
  variant: RoleTagVariant;
}

interface ProjectTagProps {
  type: 'project';
  label: string;
  variant: ProjectTagVariant;
}

interface HubTagProps {
  type: 'hub';
  label: string;
  variant: HubTagVariant;
}

interface ContentsFeedTagProps {
  type: 'contentsFeed';
  label: string;
  variant: ContentsFeedTagVariant;
}

type TagProps =
  | RoleTagProps
  | ProjectTagProps
  | HubTagProps
  | ContentsFeedTagProps;

const tagStyles = cva(
  'inline-flex items-center px-3 py-1 text-[12px] font-medium rounded-full',
  {
    variants: {
      type: {
        role: 'bg-[#eaeaea]',
        project: '',
        hub: '',
        contentsFeed: '',
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

        PROJECT:
          'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE] text-[14px] rounded-full',
        OUTSOURCING:
          'bg-gradient-to-r from-[#FF8800] to-[#84FF74] text-[14px] rounded-full',
        ONLINE:
          'bg-gradient-to-r from-[#039160] to-[#96FFDA] text-[14px] rounded-full',
        OFFLINE:
          'bg-gradient-to-r from-[#FF383B] to-[#FFBCBD] text-[14px] rounded-full',
        OPEN: 'bg-gradient-to-r from-[#9340FF] to-[#FFDCDC] text-[14px] rounded-full',
        CLOSE:
          'bg-gradient-to-r from-[#000000] to-[#FFFFFF] text-[14px] rounded-full',

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
      },
    },

    defaultVariants: {
      type: 'role',
    },
  }
);

const Tag: React.FC<TagProps> = ({ label, type, variant }) => {
  return <span className={cn(tagStyles({ type, variant }))}>{label}</span>;
};

export default Tag;
