import { fetchFeed } from '@/apis/feed';
import FeedDetailModal from '@/components/organisms/modals/FeedDetailModal';

const TestPage = () => {
  const onclose = () => console.log('hello');
  return (
    <>
      <FeedDetailModal onClose={onclose} />
    </>
  );
};

export default TestPage;
