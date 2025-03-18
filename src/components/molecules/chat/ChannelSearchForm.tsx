import { FormEvent, InputHTMLAttributes } from 'react';
import BaseSearchForm from './BaseSearchForm';

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'className'
  > {}

const ChannelSearchForm = ({ value, onChange, className }: Props) => {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <BaseSearchForm
      value={value || ''}
      onSubmit={handleSearch}
      onChange={onChange}
      className={className}
    />
  );
};

export default ChannelSearchForm;
