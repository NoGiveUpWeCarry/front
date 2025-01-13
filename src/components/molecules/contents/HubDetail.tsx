import Avatar from '@/components/atoms/Avatar';
import HubDetailUser from '@/components/atoms/contents/HubDetailUser';
import Tag from '@/components/atoms/Tag';
import HubDetailTitle from '@/components/molecules/contents/HubDetailTitle';
import HubInfo from '@/components/molecules/contents/HubInfo';
import HubInfoTag from '@/components/molecules/contents/HubInfoTag';
import HubIntroduce from '@/components/molecules/contents/HubIntroduce';
import HubTitle from '@/components/molecules/contents/HubTitle';

const HubDetail = () => {
  return (
    <div className='flex flex-col bg-white rounded-[20px] p-[20px]'>
      <div className='flex flex-col gap-[30px]'>
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
        <div className='flex flex-col gap-[20px]'>
          <HubInfo type='calendar' label='시작 예정일' value='2025-01-13' />
          <HubInfo
            type='roledetail'
            label='직무'
            value='Programmer > 프론트엔드 개발자'
          />
          <HubInfo type='clock' label='프로젝트 예상 기간' value='3개월' />
          <HubInfo type='workflow' label='작업 방식' value='온라인' />
        </div>
        <div className='flex gap-[10px]'>
          <Tag type='skill' label='# React' variant='React' />
          <Tag type='skill' label='# JavaScript' variant='JavaScript' />
          <Tag type='skill' label='# TypeScript' variant='TypeScript' />
        </div>
        <div className='flex'>
          <HubDetailTitle title='프로젝트 소개' />
        </div>
        <div className='flex'>
          <HubDetailTitle title='프로젝트 매니저 소개' />
        </div>
        <div className='flex border rounded-[10px]'>
          <div className='flex  w-full mx-[20px] my-[30px]'>
            <div className='flex w-full  items-center  justify-between'>
              <div className='flex items-center gap-[20px]'>
                <Avatar src='/src/assets/images/example.svg' size='sm' />
                <div className='flex'>
                  <HubDetailUser
                    name='leechan'
                    introduce='PAD팀 PM 이찬 입니다'
                  />
                </div>
              </div>
              <div className='flex'>
                <HubIntroduce />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
