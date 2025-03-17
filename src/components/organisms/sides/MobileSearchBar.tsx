import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { useSearchModal } from '@/store/modals/searchModalstore';
import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileSearchBar = () => {
  const { setKeyword, keyword } = useSearchModal();
  const navigate = useNavigate();

  const handleKeyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!keyword) {
        alert('검색어를 입력해주세요.');
        return;
      }
      navigate(`/search?q=${keyword}&type=page`);
    }
  };

  return (
    <div className='flex-1 ml-6 mr-6 h-8 px-3 border rounded-lg border-none bg-[#f1f1f7] flex items-center'>
      <Icon type='search' className='w-6 h-6' color='gray' />
      <Input
        placeholder='검색어 입력'
        bgColor='transparent'
        className='border-0 h-full !text-[16px] !pl-2'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyEvent}
      />
    </div>
  );
};

export default MobileSearchBar;
