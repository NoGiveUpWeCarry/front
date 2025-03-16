import CloseButton from '@/components/molecules/CloseButton';
import { SearchAction } from '@/store/searchStore';
import { ChangeEvent, FormEvent, useState } from 'react';
import BaseSearchForm from './BaseSearchForm';

interface Props {
  setState: SearchAction['setState'];
  isFetching: boolean;
}

const MessageSearchForm = ({ setState, isFetching }: Props) => {
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
    <BaseSearchForm
      value={keyword}
      onSubmit={handleSearch}
      onChange={handleInput}
    >
      {keyword && <CloseButton onClose={handleClose} />}
    </BaseSearchForm>
  );
};

export default MessageSearchForm;
