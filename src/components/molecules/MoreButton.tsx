import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface MoreButtonProps {
  hasMore: boolean;
  onClickMore: () => void;
}

const MoreButton = ({ hasMore, onClickMore }: MoreButtonProps) => {
  if (!hasMore) return null;

  return (
    <button
      className='text-[#838383] flex w-full justify-end items-center gap-1'
      onClick={onClickMore}
    >
      더보기 <ChevronRightIcon width={12} strokeWidth={3} />
    </button>
  );
};

export default MoreButton;
