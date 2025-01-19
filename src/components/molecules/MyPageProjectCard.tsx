import { ShortProjects } from '@/types/mypage.type';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { PenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyPageProjectCard = ({
  onClickUpdate,
  ...work
}: ShortProjects & { onClickUpdate: () => void }) => {
  const { title, description, links } = work;
  const linkTypes = links?.map((el) => el.type);

  return (
    <div className='rounded-[10px] w-full h-[131px] bg-white p-3 flex items-center gap-[18px] relative'>
      <button
        className='absolute right-0 top-3 px-3 pointer-default z-10'
        onClick={onClickUpdate}
      >
        <PenIcon width={14} />
      </button>
      <Link
        to={links.filter((el) => el.type === 'Github')[0]?.url}
        className='flex items-center gap-[18px] relative'
      >
        <img
          src='https://images.unsplash.com/photo-1735437629103-0fac198c7c2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='project cover image'
          className='w-[101px] h-[114px] rounded-[10px]'
        />
        <div className='flex flex-col h-[104px] relative'>
          <span className='font-semibold text-[20px]'>{title}</span>
          <span className='text-[13px] font-regular text-[#838383] line-clamp-2'>
            {description}
          </span>
          <div className='mt-3 flex gap-1'>
            {linkTypes.includes('Web') && <GlobeAltIcon width={18} />}
            {linkTypes.includes('IOS') && (
              <img
                src='/src/assets/icons/apple.svg'
                width={20}
                className='pb-[2px]'
              />
            )}
            {linkTypes.includes('Android') && (
              <img src='/src/assets/icons/android.svg' width={18} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyPageProjectCard;
