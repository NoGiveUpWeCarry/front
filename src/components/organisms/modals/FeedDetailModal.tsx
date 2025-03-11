import Modal2 from '@/components/molecules/Modal';
import FeedDetailChat from '@/components/organisms/feed/FeedDetailChat';

interface FeedDetailModalProps {
  onClose: () => void;
}

const FeedDetailModal = ({ onClose }: FeedDetailModalProps) => {
  return (
    <Modal2 onClose={onClose} className='h-[90vh]'>
      <div className='w-full flex flex-col overflow-y-scroll'>
        <FeedDetailChat comments={[]} feedId={-1} />
      </div>
    </Modal2>
  );
};

export default FeedDetailModal;
