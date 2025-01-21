import { useState } from 'react';
import Button from '@/components/atoms/Button';
import {
  FeedSelect,
  HubSelect,
} from '@/components/atoms/contents/ContentsSelect';
import { ContentsToggle } from '@/components/atoms/contents/ContentsToggle';
import { Plus } from 'lucide-react';
import PostFeedModal from '@/components/organisms/modals/PostFeedModal';
import PostHubModal from '@/components/organisms/modals/PostHubModal';
import useFeedStore from '@/store/postFeedStore';

export const FeedContentsTop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetFeed = useFeedStore((state) => state.resetFeed);

  const openPostModal = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    const answer = window.confirm(
      '작성중인 피드가 사라집니다. 정말 나가시겠습니까?'
    );
    if (answer) {
      resetFeed();
    }
    setIsModalOpen(!answer);
  };

  return (
    <>
      <div className='flex flex-col items-start gap-[20px]'>
        <div className='flex w-full justify-between items-center border border-gray-300 rounded-lg p-1'>
          <ContentsToggle />
          <Button
            width='90px'
            height='50px'
            variants='filled'
            radius='md'
            className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-md'
            onClick={openPostModal}
          >
            <Plus className='mr-2 w-5 h-5' /> 새 피드
          </Button>
        </div>
        <FeedSelect />
      </div>
      {isModalOpen && <PostFeedModal onClose={closePostModal} />}
    </>
  );
};

export const HubContentsTop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openHubModal = () => {
    setIsModalOpen(true);
  };

  const closeHubModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='flex flex-col items-start gap-[20px]'>
      <div className='flex w-full justify-between items-center border border-gray-300 rounded-lg p-1'>
        <div className='flex items-center gap-[10px]'>
          <ContentsToggle />
          <HubSelect />
        </div>
        <Button
          width='90px'
          height='50px'
          variants='filled'
          radius='md'
          className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-md'
          onClick={openHubModal}
        >
          <Plus className='mr-2 w-5 h-5' /> 새 허브
        </Button>
      </div>
      {isModalOpen && <PostHubModal onClose={closeHubModal} />}
    </div>
  );
};
