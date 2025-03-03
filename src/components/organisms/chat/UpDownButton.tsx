import Icon from '@/components/atoms/Icon';
import { useSearchUpDown } from '@/hooks/chat/useSearchUpDown';
import { SearchState } from '@/store/searchStore';

interface Props {
  searchDirection: 'forward' | 'backward';
  onUpDown: (direciton: SearchState['searchDirection']) => void;
  isError: boolean;
  error: Error | null;
}

const UpDownButton = ({ searchDirection, onUpDown, isError, error }: Props) => {
  const { isFirstMessage, isLastMessage } = useSearchUpDown({
    searchDirection,
    isError,
    error,
  });

  return (
    <>
      <button
        className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
        aria-label='이전 메시지'
        disabled={isFirstMessage}
        onClick={() => onUpDown('backward')}
      >
        <Icon type='arrow' className='w-[20px] h-[20px] text-inherit' />
      </button>
      <button
        className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
        aria-label='다음 메시지'
        disabled={isLastMessage}
        onClick={() => onUpDown('forward')}
      >
        <Icon
          type='arrow'
          className='transform rotate-180 w-[20px] h-[20px] text-inherit'
        />
      </button>
    </>
  );
};

export default UpDownButton;
