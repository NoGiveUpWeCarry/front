import SearchInput from '@/components/molecules/chat/SearchInput';
import { InputHTMLAttributes } from 'react';

interface SearchChannelProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {}

const SearchChannel = ({ value, onChange }: SearchChannelProps) => {
  return <SearchInput value={value} onChange={onChange} />;
};

export default SearchChannel;
