import Button from '@/components/atoms/Button';
import FollowButton from '@/components/atoms/FollowButton';
import { LinkIcon } from '@heroicons/react/16/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const LINKS = {
  notion: '/src/assets/icons/notion.svg',
  github: '/src/assets/icons/github.svg',
  figma: '/src/assets/icons/figma.svg',
  linkedin: '/src/assets/icons/linkedin.svg',
};

const MyPageHeader = () => {
  return (
    <div className='h-[166px] flex items-center gap-7'>
      <div className='w-[120px] h-[120px]'>
        <img
          src={
            'https://images.unsplash.com/photo-1735437629103-0fac198c7c2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className='w-full h-full object-cover rounded-full'
        />
      </div>
      <div className='flex-1 flex flex-col gap-5 justify-center relative'>
        <div className='flex items-center gap-[10px]'>
          <h1 className='text-heading2 font-semibold'>테스트용계정</h1>
          <FollowButton isFollowing={true} />
        </div>
        <p className='text-body1 font-regular line-clamp-2'>
          프로젝트 구인 중입니다. 프로젝트 구인 중입니다. 프로젝트 구인
          중입니다. 프로젝트 구인 중입니다. 프로젝트 구인 중입니다. 프로젝트
          구인 중입니다. 프로젝트 구인 중입니다. 프로젝트 구인 중입니다.
          프로젝트 구인 중입니다. 프로젝트 구인 중입니다.
        </p>
        <div className='flex gap-3 items-center'>
          <button>
            <span className='text-body1 font-extrabold text-[#FF7E5F]'>
              Resume
            </span>
          </button>
          <button>
            <LinkIcon width={20} height={20} />
          </button>
        </div>
        <div className='absolute right-0 top-0'>
          <Button
            width='92px'
            height='29px'
            radius='sm'
            variants='outline'
            borderColor='black'
            className='font-semibold text-[15px] flex items-center justify-center gap-[10px]'
          >
            메세지 <EnvelopeIcon width={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;
