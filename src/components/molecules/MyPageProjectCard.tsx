import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MyPageProjectCard = () => {
  return (
    <Link to='/'>
      <div className='rounded-[10px] w-full h-[131px] bg-white p-3 flex items-center gap-[18px]'>
        <img
          src={
            'https://images.unsplash.com/photo-1735437629103-0fac198c7c2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt='project cover image'
          className='w-[101px] h-[114px] rounded-[10px]'
        />
        <div className='flex flex-col'>
          <span className='font-semibold text-[20px]'>프로젝트명</span>
          <span className='text-[13px] font-regular text-[#838383] line-clamp-2'>
            어쩌구 저쩌구 사이트 어쩌구 저쩌구 사이트 어쩌구 저쩌구 사이트
          </span>
          <div className='mt-2 flex gap-1'>
            <GlobeAltIcon width={18} />
            <img src={'/src/assets/icons/android.svg'} width={18} />
            <img
              src={'/src/assets/icons/apple.svg'}
              width={20}
              className='pb-[2px]'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyPageProjectCard;
