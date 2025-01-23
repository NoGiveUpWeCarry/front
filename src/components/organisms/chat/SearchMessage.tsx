import Icon from '@/components/atoms/Icon';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { useSearchMessages } from '@/hooks/useSearchMessages';
import { ChatState } from '@/store/chatStore';
import { useState } from 'react';

interface SearchMessagesProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const SearchMessage = ({ currentChannelId }: SearchMessagesProps) => {
  const [keyword, setKeyword] = useState('');
  const { loadMore, handleSearch, cursors } = useSearchMessages(
    currentChannelId,
    keyword
  );

  return (
    <div className='shrink-0 flex items-center gap-2'>
      {keyword.trim() && (
        <>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='이전 메시지'
            disabled={cursors.search === null || cursors.prev === null}
            onClick={() => loadMore('backward')}
          >
            <Icon type='arrow' className='w-[20px] h-[20px] text-inherit' />
          </button>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='최근 메시지'
            disabled={cursors.search === null || cursors.next === null}
            onClick={() => loadMore('forward')}
          >
            <Icon
              type='arrow'
              className='transform rotate-180 w-[20px] h-[20px] text-inherit'
            />
          </button>
        </>
      )}
      <SearchInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchMessage;
