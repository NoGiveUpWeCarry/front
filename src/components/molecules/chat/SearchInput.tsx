import MagnifyingGlass from '@/components/atoms/icon/MagnifyingGlass';
import Input from '@/components/atoms/Input';

const SearchInput = () => {
  return (
    <div className='relative'>
      <span className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
        <MagnifyingGlass />
      </span>
      <Input
        type='text'
        placeholder='검색'
        className='pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3]'
      />
    </div>
  );
};

export default SearchInput;
