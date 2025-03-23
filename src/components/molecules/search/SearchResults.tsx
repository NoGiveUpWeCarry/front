import ShortFeed from '@/components/molecules/search/ShortFeed';
import ShortProject from '@/components/molecules/search/ShortProject';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface SearchResultsProps {
  items: any[];
  type: 'hub' | 'feed';
  title: string;
  onNavigate: (id: number) => void;
  hasMore: boolean;
  hasMoreNavigate: () => void;
  isFirstTab: boolean;
  isLoading: boolean;
}

const SearchResults = ({
  items,
  type,
  title,
  onNavigate,
  hasMore,
  hasMoreNavigate,
  isFirstTab,
  isLoading,
}: SearchResultsProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='font-semibold text-[18px]'>{title}</p>
      <div className='flex flex-col gap-2'>
        {items && (
          <>
            {items?.slice(0, isFirstTab ? 3 : 4).map((item) => {
              if (type === 'feed') {
                return (
                  <ShortFeed
                    {...item}
                    onClick={() => onNavigate(item.feedId)}
                  />
                );
              } else {
                return (
                  <ShortProject
                    {...item}
                    onClick={() => onNavigate(item.projectId)}
                  />
                );
              }
            })}
            {hasMore && (
              <button
                className='text-[#838383] flex w-full justify-end items-center gap-1'
                onClick={hasMoreNavigate}
              >
                더보기 <ChevronRightIcon width={12} strokeWidth={3} />
              </button>
            )}
          </>
        )}
        {items?.length === 0 && !isLoading && (
          <div className='py-2'>검색 결과가 존재하지 않습니다.</div>
        )}
        {isLoading && <div className='py-2'>검색 결과를 불러오는 중...</div>}
      </div>
    </div>
  );
};

export default SearchResults;
