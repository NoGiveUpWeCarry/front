import SearchInput from '@/components/molecules/chat/SearchInput';
import { InputHTMLAttributes } from 'react';

interface SearchChannelProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'className'
  > {}

const SearchChannel = ({ value, onChange, className }: SearchChannelProps) => {
  return (
    <div className={className}>
      <SearchInput value={value} onChange={onChange} />
    </div>
  );
};

export default SearchChannel;
