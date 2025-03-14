import Icon from '@/components/atoms/Icon';
import MessageSearchForm from '@/components/molecules/chat/MessageSearchForm';
import { useSearchMessages } from '@/hooks/chat/useSearchMessages';
import { useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { useShallow } from 'zustand/shallow';

interface SearchMessageProps {
  currentChannelId: Channel['channelId'];
}

const SearchMessage = ({ currentChannelId }: SearchMessageProps) => {
  const { setState, searchKeyword, searchDirection, searchCursor } =
    useSearchStore(
      useShallow((state) => ({
        setState: state.setState,
        searchKeyword: state.searchKeyword,
        searchDirection: state.searchDirection,
        searchCursor: state.searchCursor,
      }))
    );

  const queryKey = {
    channelId: currentChannelId,
    keyword: searchKeyword,
    direction: searchDirection,
    cursor: searchCursor,
  };

  const { data, isFetching, error } = useSearchMessages(queryKey);

  const onClickUp = () => {
    setState({ searchDirection: 'backward', searchCursor: data?.cursor });
  };

  const onClickDown = () => {
    setState({ searchDirection: 'forward', searchCursor: data?.cursor });
  };

  return (
    <div className='shrink-0 flex items-center gap-2'>
      <>
        <button
          className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
          aria-label='이전 메시지'
          disabled={isFetching || !!error}
          onClick={onClickUp}
        >
          <Icon type='arrow' className='w-[20px] h-[20px] text-inherit' />
        </button>
        <button
          className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
          aria-label='다음 메시지'
          disabled={isFetching || !!error}
          onClick={onClickDown}
        >
          <Icon
            type='arrow'
            className='transform rotate-180 w-[20px] h-[20px] text-inherit'
          />
        </button>
      </>
      <MessageSearchForm isFetching={isFetching} setState={setState} />
    </div>
  );
};

export default SearchMessage;
