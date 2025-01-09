import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export function FeedSelect() {
  return (
    <Select>
      <SelectTrigger className='w-[90px] bg-white'>
        <SelectValue placeholder='🏷️ 태그' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='all'>🏷️ 태그</SelectItem>
          <SelectItem value='고민'>#고민</SelectItem>
          <SelectItem value='회고'>#회고</SelectItem>
          <SelectItem value='아이디어'>#아이디어</SelectItem>
          <SelectItem value='계획'>#계획</SelectItem>
          <SelectItem value='토론'>#토론</SelectItem>
          <SelectItem value='정보공유'>#정보공유</SelectItem>
          <SelectItem value='추천'>#추천</SelectItem>
          <SelectItem value='질문'>#질문</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function HubSelect() {
  const [selectedRole] = useState<string | null>(null); // 첫 번째 셀렉트의 선택된 값
  const [workUnits, setWorkUnits] = useState<string[]>([]); // 두 번째 셀렉트의 옵션

  const handleRoleChange = (value: string) => {
    if (value in jobRoles) {
      setWorkUnits(jobRoles[value as keyof typeof jobRoles]);
    } else {
      setWorkUnits([]);
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger className='w-[130px] h-[44px] bg-white'>
          <SelectValue placeholder={selectedRole || '직군'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>직군</SelectItem>
            <SelectItem value='Programmer'>Programmer</SelectItem>
            <SelectItem value='Artist'>Artist</SelectItem>
            <SelectItem value='Designer'>Designer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='w-[180px] h-[44px] bg-white'>
          <SelectValue placeholder='모집단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>모집단위</SelectItem>
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
}
