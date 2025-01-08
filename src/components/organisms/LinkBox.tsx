import { ChangeEvent } from 'react';
import LinkInput from '@/components/molecules/LinkInput';

interface LinkBoxProps {
  links: string[];
  setLinks: (value: string[]) => void;
}

const LinkBox = ({ links, setLinks }: LinkBoxProps) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setLinks(
      links.map((input: string, i: number) => (i === index ? value : input))
    );
  };

  const handleAddInput = () => {
    if (links.length === 4) {
      alert('링크는 4개까지만 가능합니다.');
      return;
    }

    const isAnyInputEmpty = links.some((link) => link === '');
    if (isAnyInputEmpty) {
      alert('모든 항목을 채워야 새 링크를 추가할 수 있습니다.');
      return;
    }
    setLinks([...links, '']);
  };

  return (
    <div className='w-full mt-4 bg-[#EAEAEA] p-5 rounded-[10px]'>
      <div className='flex flex-col gap-[13px] text-[15px]'>
        {links.map((item, index) => (
          <LinkInput
            key={`input-${index}`}
            url={item}
            index={index}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
        <button
          className='w-full h-9 rounded-[10px] bg-white flex justify-center items-center'
          onClick={handleAddInput}
        >
          + 소셜 링크 추가
        </button>
      </div>
    </div>
  );
};

export default LinkBox;
