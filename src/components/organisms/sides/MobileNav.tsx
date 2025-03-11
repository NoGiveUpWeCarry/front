import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Logo from '@/components/atoms/Logo';
import { useSearchModal } from '@/store/modals/searchModalstore';
import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const MobileNav = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useSearchModal(
    useShallow((state) => [state.keyword, state.setKeyword])
  );

  const keyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${keyword}&type=page`);
    }
  };

  return (
    <div className='border-b border-lightgray w-full h-full'>
      <div className='w-full h-full flex items-center px-2 justify-between'>
        <nav
          aria-label='모바일 메뉴'
          className='flex flex-row items-center mr-1 w-full'
        >
          <a href='/' className='w-[40px] h-[16px]'>
            <Logo width='44px' height='18px' />
          </a>
          <div className='w-full h-8 pl-3 pr-1 py-[6px] border rounded-lg border-none bg-lightgray flex ml-6 mr-1'>
            <div className='w-5 h-5'>
              <Icon type='search' className='text-gray' />
            </div>
            <Input
              placeholder='검색어 입력'
              bgColor='transparent'
              className='border-0 !text-sm spacing-none ml-[-10px]'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={keyHandler}
            />
          </div>
        </nav>
        <nav className='flex w-[102px] h-8 bg-blue-300'></nav>
      </div>
    </div>
  );
};

export default MobileNav;
