import HubInfoTag from '@/components/molecules/contents/HubInfoTag';
import HubTitle from '@/components/molecules/contents/HubTitle';

const HubDetail = () => {
  return (
    <div className='flex flex-col bg-white rounded-[20px] p-[20px]'>
      <div className='flex flex-col gap-[20px]'>
        <HubTitle
          projectTags={[{ label: 'PROJECT', variant: 'PROJECT' }]}
          title={
            '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.'
          }
        />
        <HubInfoTag
          hubTags={[
            { label: 'ONLINE', variant: 'ONLINE' as const },
            { label: 'OPEN', variant: 'OPEN' as const },
          ]}
          roleTags={[
            {
              label: '#프론트엔드 개발자',
              variant: '프론트엔드 개발자' as const,
            },
            {
              label: '#서버/백엔드 개발자',
              variant: '서버/백엔드 개발자' as const,
            },
            { label: '#웹퍼블리셔', variant: '웹퍼블리셔' as const },
          ]}
          role='PROGRAMMER'
        />
      </div>
    </div>
  );
};

export default HubDetail;
