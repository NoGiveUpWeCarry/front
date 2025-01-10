import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import ShortFeed from '@/components/molecules/search/ShortFeed';
import ShortProject from '@/components/molecules/search/ShortProject';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import Tabs from '@/components/organisms/Tabs';
import { feedItem } from '@/mock/feedItem';
import { hubItem } from '@/mock/hubItem';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ onClose }: ModalProps) => {
  const result = [''];
  const navigate = useNavigate();

  return (
    <Modal onClose={onClose} width='808px' height='687px'>
      <div className='w-full h-full px-[50px] flex flex-col'>
        <div className='mb-6 w-full h-6 flex items-center'>
          <Icon type='search' className='w-6 h-6' color='gray' />
          <Input
            placeholder='검색어 입력'
            bgColor='transparent'
            className='border-0 h-full !text-[16px]'
          />
        </div>
        <Tabs>
          {['전체', '피드', '커넥션 허브', '태그'].map((item, i) => (
            <Tabs.TabItem key={item} hideDivider={i === 3}>
              {item}
            </Tabs.TabItem>
          ))}
        </Tabs>
        <div
          className='overflow-y-scroll pb-10'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {result.length > 0 ? (
            <div className='mt-6 flex flex-col flex-1 relative'>
              <div className='flex flex-col gap-5'>
                <p className='font-semibold'>피드</p>
                <div className='flex flex-col gap-5'>
                  {feedItem.slice(0, 2).map((feed) => (
                    <ShortFeed
                      {...feed}
                      onClick={() => {
                        navigate('/');
                        onClose();
                      }}
                    />
                  ))}
                  <button className='text-[#838383] flex w-full justify-end items-center gap-1'>
                    더보기 <ChevronRightIcon width={12} strokeWidth={3} />
                  </button>
                </div>
              </div>
              <div className='mt-10'>
                <p className='font-semibold mb-4'>커넥션 허브</p>
                <div className=' flex flex-col gap-[30px]'>
                  {hubItem.slice(0, 2).map((hub) => (
                    <ShortProject key={hub.title} {...hub} onClick={() => {}} />
                  ))}
                  <button className='text-[#838383] flex w-full justify-end items-center gap-1'>
                    더보기 <ChevronRightIcon width={12} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='mt-6 flex flex-col flex-1 justify-center items-center text-[14px] pb-10'>
              <span>피드나 프로젝트를 검색해보세요.</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
