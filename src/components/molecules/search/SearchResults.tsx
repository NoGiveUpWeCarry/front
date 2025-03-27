import MoreButton from '@/components/molecules/MoreButton';
import ShortFeed from '@/components/molecules/search/ShortFeed';
import ShortProject from '@/components/molecules/search/ShortProject';
import { useSearchContext } from '@/hooks/context/useSearchContext';
import { ProjectResult, FeedResult } from '@/types/search.type';

// Types
type SearchResultType = 'feed' | 'project';
type SearchResultData<T> = { items?: T[]; hasMore?: boolean };

interface SearchItemProps<T> {
  items?: T[];
  onClickItem: (id: number) => void;
}

interface SearchResultBoxProps {
  title: string;
  hasMore?: boolean;
  onClickMore: () => void;
  isLoading: boolean;
}

interface SearchResultItemProps {
  title: string;
  data: SearchResultData<FeedResult | ProjectResult>;
  onTabChange: () => void;
  type: SearchResultType;
}

// UI Components
const SearchLoading = () => (
  <div className='py-2'>검색 결과를 불러오는 중...</div>
);

const EmptyResults = () => (
  <div className='py-2'>검색 결과가 존재하지 않습니다.</div>
);

const SearchResultBox = ({
  title,
  hasMore,
  onClickMore,
  isLoading,
  children,
}: SearchResultBoxProps & React.PropsWithChildren) => (
  <div className='flex flex-col gap-2'>
    <p className='font-semibold text-[18px]'>{title}</p>
    <div className='flex flex-col gap-2'>
      {isLoading ? <SearchLoading /> : children}
      <MoreButton hasMore={hasMore ?? false} onClickMore={onClickMore} />
    </div>
  </div>
);

// Result Components
export const ProjectSearchResults = ({
  items,
  onClickItem,
}: SearchItemProps<ProjectResult>) => {
  if (!items?.length) return <EmptyResults />;

  return (
    <>
      {items.slice(0, 4).map((item) => (
        <ShortProject
          key={item.projectId}
          {...item}
          onClick={() => onClickItem(item.projectId)}
        />
      ))}
    </>
  );
};

export const FeedSearchResults = ({
  items,
  onClickItem,
}: SearchItemProps<FeedResult>) => {
  if (!items?.length) return <EmptyResults />;

  return (
    <>
      {items.slice(0, 4).map((item) => (
        <ShortFeed
          key={item.feedId}
          {...item}
          onClick={() => onClickItem(item.feedId)}
        />
      ))}
    </>
  );
};

// Main Component
const SearchResultItem = ({
  title,
  data: { items, hasMore },
  onTabChange,
  type,
}: SearchResultItemProps) => {
  const { keyword, isLoading, onNavigate } = useSearchContext();

  const handleClickMore = () => {
    onNavigate(`/search?q=${keyword}&type=page`);
    onTabChange();
  };

  const handleClickItem = (id: number) => {
    const basePath = type === 'feed' ? '/feed' : '/projects';
    onNavigate(`${basePath}/${id}?from=search`);
  };

  if (!items?.length) return <EmptyResults />;

  return (
    <SearchResultBox
      title={title}
      hasMore={hasMore}
      onClickMore={handleClickMore}
      isLoading={isLoading}
    >
      {type === 'feed' && (
        <FeedSearchResults
          items={items as FeedResult[]}
          onClickItem={handleClickItem}
        />
      )}
      {type === 'project' && (
        <ProjectSearchResults
          items={items as ProjectResult[]}
          onClickItem={handleClickItem}
        />
      )}
    </SearchResultBox>
  );
};

export default SearchResultItem;
