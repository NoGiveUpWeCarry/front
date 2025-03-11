import Icon from '@/components/atoms/Icon';
import Logo from '@/components/atoms/Logo';

const MobileNav = () => {
  return (
    <div className='border-b border-lightgray w-full h-full'>
      <div className='w-full h-full flex items-center px-2 justify-between'>
        <nav
          aria-aria-label='모바일 메뉴'
          className='flex flex-row items-center mr-1 w-full'
        >
          <a href='/' className='w-[40px] h-[16px]'>
            <Logo width='40px' height='16px' />
          </a>
          <a href='/search' className='w-full h-full ml-3'>
            <div className='w-full h-8 px-3 py-[6px] border rounded-lg border-none bg-lightgray flex'>
              <div className='w-5 h-5'>
                <Icon type={'search'} className='text-gray' />
              </div>
              <input
                className='w-full bg-transparent text-lg'
                placeholder='검색하기'
              />
            </div>
          </a>
        </nav>
        <nav className='flex w-[102px] h-8 bg-blue-300'></nav>
      </div>
    </div>
  );
};

export default MobileNav;
