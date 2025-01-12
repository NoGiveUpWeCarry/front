import { MY_LINKS } from '@/constants/mypageLinks';
import { LinkIcon } from '@heroicons/react/24/outline';
import useDebounce from '@/hooks/useDebounce';
import UrlInput from '@/components/molecules/UrlInput';
import { ChangeEvent } from 'react';

interface UrlInputProps {
  url: string;
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LinkInput = ({ url, index, onChange }: UrlInputProps) => {
  const debouncedUrl = useDebounce(url, 300);

  const extractServiceName = (url: string) => {
    const domain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
    return domain.split('.')[0];
  };

  const getCategoryName = (keyword: string) => {
    const matchedKey = Object.keys(MY_LINKS).find((key) => keyword === key);
    return {
      text: matchedKey
        ? matchedKey[0].toUpperCase() + matchedKey.slice(1)
        : `Link`,
      icon: matchedKey ? (
        <img
          src={MY_LINKS[matchedKey as keyof typeof MY_LINKS]}
          alt={matchedKey}
          width={16}
        />
      ) : (
        <LinkIcon width={16} />
      ),
    };
  };

  const keyword = extractServiceName(debouncedUrl);
  const { text, icon } = getCategoryName(keyword);

  console.log(url, text);

  return (
    <UrlInput
      key={`input-${index}`}
      icon={icon}
      category={text}
      placeholder='링크를 입력해주세요'
      name={text}
      value={url}
      onChange={onChange}
    />
  );
};

export default LinkInput;
