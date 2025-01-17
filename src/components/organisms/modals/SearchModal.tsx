import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import ShortFeed from '@/components/molecules/search/ShortFeed';
import ShortProject from '@/components/molecules/search/ShortProject';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import Tabs from '@/components/organisms/Tabs';
import { feedItem } from '@/mocks/mock-data/feedItem';
import { hubItem } from '@/mocks/mock-data/hubItem';
import useDebounce from '@/hooks/useDebounce';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabs } from '@/hooks/useTabs';

const SearchModal = ({ onClose }: ModalProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const feedData = feedItem.filter((el) => el.title.includes(debouncedKeyword));
  const hubData = hubItem.filter(
    (el) =>
      el.title.includes(debouncedKeyword) ||
      el.roleTags.map((t) => t.label).includes(debouncedKeyword)
  );

  const { tabs, active, setActive } = useTabs(['전체', '피드', '커넥션 허브']);

  // 키워드 검색 로직

  const handleNaivgate = (endpoint: string) => {
    navigate(endpoint);
    onClose();
  };

  return (
    <Modal onClose={onClose} width='808px' height='687px'>
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
              <div className='flex flex-col gap-5'>
                <p className='font-semibold'>피드</p>
                <div className='flex flex-col gap-5'>
                  {feedData.slice(0, 2).map((feed) => (
                    <ShortFeed {...feed} onClick={() => handleNaivgate('/')} />
                  ))}
                  {!feedData.length && (
                    <div className='mt-[-20px] mb-5'>
                      검색 결과가 존재하지 않습니다.
                    </div>
                  )}
                  {feedData.length > 0 && (
                    <button
                      className='text-[#838383] flex w-full justify-end items-center gap-1'
                      onClick={() =>
                        handleNaivgate(`/search?q=${debouncedKeyword}`)
                      }
                    >
                      더보기 <ChevronRightIcon width={12} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className='font-semibold mb-4'>커넥션 허브</p>
                <div className='flex flex-col gap-[30px]'>
                  {hubData.slice(0, 3).map((hub) => (
                    <ShortProject key={hub.title} {...hub} onClick={() => {}} />
                  ))}
                  {!hubData.length && (
                    <div className='mt-[-14px]'>
                      검색 결과가 존재하지 않습니다.
                    </div>
                  )}
                  {hubData.length > 0 && (
                    <button
                      className='text-[#838383] flex w-full justify-end items-center gap-1'
                      onClick={() =>
                        handleNaivgate(`/search?q=${debouncedKeyword}`)
                      }
                    >
                      더보기 <ChevronRightIcon width={12} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
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
