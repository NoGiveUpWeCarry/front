import SearchInput from '@/components/molecules/chat/SearchInput';
import UpDownButton from '@/components/organisms/chat/UpDownButton';
import { LIMIT } from '@/constants/limit';
import { useSearchMessages } from '@/hooks/chat/useSearchMessages';
import { initialState, SearchState, useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useShallow } from 'zustand/shallow';

interface SearchMessageProps {
  currentChannelId: Channel['channelId'];
}

const SearchMessage = ({ currentChannelId }: SearchMessageProps) => {
  const [keyword, setKeyword] = useState('');

  const { setState, searchDirection, searchCursor, searchKeyword } =
    useSearchStore(
      useShallow((state) => ({
        setState: state.setState,
        searchMode: state.searchMode,
        searchDirection: state.searchDirection,
        searchCursor: state.searchCursor,
        searchKeyword: state.searchKeyword,
      }))
    );

  const { data, isFetching, error, isError } = useSearchMessages({
    channelId: currentChannelId,
    cursor: searchCursor,
    direction: searchDirection,
    keyword: searchKeyword,
    limit: LIMIT.SEARCH_MESSAGES,
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || isFetching) return;

    setState({
      searchDirection: 'backward',
      searchKeyword: keyword,
      searchMode: true,
      cursors: initialState.cursors,
    });
  };

  const handleUpDown = (direciton: SearchState['searchDirection']) => {
    if (isFetching || !searchKeyword.trim()) return;

    setState({
      searchDirection: direciton,
      searchCursor: data?.cursors.search,
      searchMode: true,
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className='shrink-0 flex items-center gap-2'>
      <UpDownButton
        onUpDown={handleUpDown}
        error={error}
        isError={isError}
        searchDirection={searchDirection}
      />
      <SearchInput
        value={keyword}
        onChange={handleInput}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchMessage;
