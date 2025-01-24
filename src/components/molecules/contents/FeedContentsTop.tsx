import Button from '@/components/atoms/Button';
import { FeedSelect } from '@/components/atoms/contents/FeedContentsSelect';
import { ContentsToggle } from '@/components/atoms/contents/ContentsToggle';
import { Plus } from 'lucide-react';
import PostFeedModal from '@/components/organisms/modals/PostFeedModal';
import usePostModal from '@/hooks/usePostModal';

export const FeedContentsTop = () => {
  const { isModalOpen, setIsSubmitted, openPostModal, closePostModal } =
    usePostModal();
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
      {isModalOpen && (
        <PostFeedModal
          onClose={closePostModal}
          onSubmit={() => setIsSubmitted(true)}
        />
      )}
    </>
  );
};
