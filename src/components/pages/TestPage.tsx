import TiptapEditor from '@/components/organisms/TiptapEditor';
import PostFeedModal from '@/components/organisms/modals/PostFeedModal';
import useTiptapStore from '@/store/useTiptap.store';

const TestPage = () => {
  const content = useTiptapStore((state) => state.content);
  const setContent = useTiptapStore((state) => state.setContent);
  return (
    <div className='relative w-full h-full'>
      {/* <TiptapEditor content={content} setContent={setContent} /> */}
      <PostFeedModal />
    </div>
  );
};

export default TestPage;