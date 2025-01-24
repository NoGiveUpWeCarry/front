import LinkInput from '@/components/molecules/LinkInput';
import { useAddLink } from '@/hooks/queries/mypage/settings';

interface LinkBoxProps {
  links: { linkId: number; url: string }[];
}

const LinkBox = ({ links }: LinkBoxProps) => {
  const { mutate: addLink } = useAddLink();

  const handleAddInput = () => {
    if (links.length === 4) {
      alert('링크는 4개까지만 가능합니다.');
      return;
    }

    const isAnyInputEmpty = links.some((link) => link.url === '');
    if (isAnyInputEmpty) {
      alert('모든 항목을 채워야 새 링크를 추가할 수 있습니다.');
      return;
    }
    addLink({ link: '' });
  };

  return (
    <div className='w-full mt-4 bg-[#EAEAEA] p-5 rounded-[10px]'>
      <div className='flex flex-col gap-[13px] text-[15px]'>
        {links?.map((link, index) => {
          return <LinkInput key={link.linkId} link={link} index={index} />;
        })}
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
