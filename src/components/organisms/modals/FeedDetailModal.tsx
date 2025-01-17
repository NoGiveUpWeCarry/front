import Modal2 from '@/components/molecules/Modal';
import FeedDetailChat from '@/components/organisms/FeedDetailChat';
import FeedContent from '@/mocks/mock-data/feedContent.mock';
import { Suspense } from 'react';

interface FeedDetailModalProps {
  onClose: () => void;
}

const FeedDetailModal = ({ onClose }: FeedDetailModalProps) => {
  const tags: (
    | '고민'
    | '계획'
    | '아이디어'
    | '회고'
    | '토론'
    | '정보공유'
    | '추천'
    | '질문'
  )[] = ['고민', '계획', '아이디어'];
  const date = new Date();
  const title = '트렌드 코리아 2025 토론해요 ⚡️';
  const content = FeedContent;

  return (
    <Modal2 onClose={onClose} height='90vh'>
      <div className='w-full flex flex-col overflow-y-scroll'>
        {/* <Suspense>
          <FeedDetail tags={tags} date={date} title={title} content={content} />
        </Suspense> */}
        <FeedDetailChat />
      </div>
    </Modal2>
  );
};

export default FeedDetailModal;
