import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import CloseButton from '@/components/molecules/CloseButton';
import { SearchAction } from '@/store/searchStore';
import { ChangeEvent, FormEvent, useState } from 'react';

interface SearchInputProps {
  setState: SearchAction['setState'];
  isFetching: boolean;
}

const SearchForm = ({ setState, isFetching, ...props }: SearchInputProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || isFetching) return;

    setState({
      searchKeyword: keyword,
      searchMode: true,
      searchDirection: 'backward',
      searchCursor: null,
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClose = () => {
    setState({ searchMode: false, searchKeyword: '' });
    setKeyword('');
  };
  return (
    <div className='relative'>
      <form onSubmit={handleSearch}>
        <button className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
          <Icon type='search' color='gray' className='text-[#CCCCCC]' />
        </button>
        <Input
          type='text'
          placeholder='검색'
          className='pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3]'
          value={keyword}
          onChange={handleInput}
          {...props}
        />
        {keyword && <CloseButton onClose={handleClose} />}
      </form>
    </div>
  );
};

export default SearchForm;
