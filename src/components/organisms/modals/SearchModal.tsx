import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import Tabs from '@/components/organisms/Tabs';

import useDebounce from '@/hooks/useDebounce';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabs } from '@/hooks/useTabs';
import { useSearchByModal } from '@/hooks/queries/search.query';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import SearchResults from '@/components/molecules/search/SearchResults';
import { useSearchTabsStore } from '@/store/searchTabsStore';
import { useShallow } from 'zustand/shallow';
import { useSearchModal } from '@/store/modals/searchModalstore';

const CATEGORY = {
  전체: 'all',
  피드: 'feed',
  '커넥션 허브': 'connectionhub',
};

const SearchModal = ({ onClose }: ModalProps) => {
  const navigate = useNavigate();

  const { tabs, active, setActive } = useTabs(['전체', '피드', '커넥션 허브']);
  const [setActiveTab] = useSearchTabsStore(
    useShallow((state) => [state.setActiveTab])
  );
  const [keyword, setKeyword] = useSearchModal(
    useShallow((state) => [state.keyword, state.setKeyword])
  );
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data, refetch } = useSearchByModal(
    CATEGORY[active as keyof typeof CATEGORY] as
      | 'all'
      | 'feed'
      | 'connectionhub',
    debouncedKeyword
  );

  const feeds = data?.feedResult?.feeds;
  const hubs = data?.projectResult?.projects;

  const closeHandler = () => {
    onClose();
    setKeyword('');
  };

  useEffect(() => {
    refetch();
  }, [active]);

  return (
    <Modal onClose={closeHandler} className='!px-1 min-w-[600px] h-[560px]'>
      <div className='w-full h-full px-[50px] flex flex-col'>
        <div className='mb-6 w-full h-6 flex items-center'>
          <Icon type='search' className='w-6 h-6' color='gray' />
          <Input
            placeholder='검색어 입력'
            bgColor='transparent'
            className='border-0 h-full !text-[16px]'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className='h-10'>
          <Tabs>
            {tabs.map((item, i) => (
              <Tabs.TabItem
                key={item as string}
                hideDivider={i === 2}
                onClick={() => setActive(item)}
                isActive={active === item}
              >
                {item}
              </Tabs.TabItem>
            ))}
          </Tabs>
        </div>
        <div
          className='overflow-y-scroll'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {debouncedKeyword ? (
            <div className='mt-6 flex flex-col min-flex-1 text-[14px] pb-10 relative'>
              {active !== '커넥션 허브' && (
                <SearchResults
                  items={feeds as any[]}
                  type='feed'
                  title='피드'
                  onNavigate={(id) => {
                    navigate(`/feed/${id}?from=search`);
                    onClose();
                  }}
                  isFirstTab={active === '전체'}
                  hasMore={data?.feedResult?.hasMore as boolean}
                  hasMoreNavigate={() => {
                    setActiveTab('피드');
                    navigate(`/search?q=${debouncedKeyword}`);
                    onClose();
                  }}
                />
              )}
              {active === '전체' && <HorizontalDivider className='my-10' />}
              {active !== '피드' && (
                <SearchResults
                  items={hubs as any[]}
                  type='hub'
                  title='커넥션 허브'
                  onNavigate={(id) => {
                    navigate(`/connectionhub/${id}?from=search`);
                    onClose();
                  }}
                  isFirstTab={active === '전체'}
                  hasMore={data?.projectResult?.hasMore as boolean}
                  hasMoreNavigate={() => {
                    setActiveTab('프로젝트');
                    navigate(`/search?q=${debouncedKeyword}`);
                    onClose();
                  }}
                />
              )}
            </div>
          ) : (
            <div className='mt-6 flex flex-col flex-1 h-full justify-center items-center text-[14px] pb-10'>
              <span>피드나 프로젝트를 검색해보세요.</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
