import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useTabContext } from '@/components/organisms/Tabs';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useSearchByModal } from '@/hooks/queries/search.query';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import Tabs from '@/components/organisms/Tabs';
import VerticalDivider from '@/components/atoms/VerticalDivider';
import { useMemo, useState } from 'react';
import SearchInput from '@/components/molecules/search/SearchInput';
import { SearchContext } from '@/hooks/context/useSearchContext';
import SearchResultItem from '@/components/molecules/search/SearchResults';

const CATEGORY = {
  전체: 'all',
  피드: 'feed',
  '커넥션 허브': 'connectionhub',
} as const;

enum TabNames {
  '전체',
  '피드',
  '커넥션 허브',
}

interface SearchTabContentProps {
  keyword: string;
  onClose: () => void;
}

const SearchTabContent = ({ keyword, onClose }: SearchTabContentProps) => {
  const navigate = useNavigate();
  const { active, setActive } = useTabContext();

  const { data, isLoading } = useSearchByModal(
    CATEGORY[TabNames[active] as keyof typeof CATEGORY],
    keyword
  );

  const feeds = {
    items: data?.feedResult.feeds,
    hasMore: data?.feedResult.hasMore,
  };
  const hubs = {
    items: data?.projectResult.projects,
    hasMore: data?.projectResult.hasMore,
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const searchContextValue = useMemo(
    () => ({
      isLoading,
      keyword,
      onNavigate: handleNavigate,
    }),
    [isLoading, keyword, handleNavigate]
  );

  const tabComponents = {
    전체: (
      <>
        <SearchResultItem
          title='피드'
          onTabChange={() => setActive(TabNames['피드'])}
          data={feeds}
          type='feed'
        />
        <HorizontalDivider className='my-10' />
        <SearchResultItem
          title='커넥션 허브'
          onTabChange={() => setActive(TabNames['커넥션 허브'])}
          data={hubs}
          type='project'
        />
      </>
    ),
    피드: (
      <SearchResultItem
        title='피드'
        onTabChange={() => setActive(TabNames['피드'])}
        data={feeds}
        type='feed'
      />
    ),
    '커넥션 허브': (
      <SearchResultItem
        title='커넥션 허브'
        onTabChange={() => setActive(TabNames['커넥션 허브'])}
        data={hubs}
        type='project'
      />
    ),
  };

  if (!keyword) {
    return (
      <div className='mt-6 flex flex-col flex-1 h-full justify-center items-center text-[14px] pb-10'>
        <span>피드나 프로젝트를 검색해보세요.</span>
      </div>
    );
  }

  return (
    <div className='mt-6 flex flex-col min-flex-1 text-[14px] pb-10 relative'>
      <SearchContext.Provider value={searchContextValue}>
        <Tabs.Pannels components={Object.values(tabComponents)} />
      </SearchContext.Provider>
    </div>
  );
};

const SearchModal = ({ onClose }: ModalProps) => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Modal onClose={onClose} className='!px-1 min-w-[600px] h-[560px]'>
      <div className='w-full h-full px-[50px] flex flex-col'>
        <SearchInput value={keyword} onChange={handleKeywordChange} />
        <Tabs>
          <Tabs.Triggers
            labels={[...Object.keys(CATEGORY)]}
            divider={<VerticalDivider />}
            className='h-10 flex px-[5px] items-center bg-[#d1d1d1] rounded-[5px]'
          />
          <div
            className='overflow-y-scroll'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <SearchTabContent keyword={debouncedKeyword} onClose={onClose} />
          </div>
        </Tabs>
      </div>
    </Modal>
  );
};

export default SearchModal;
