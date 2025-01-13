import TiptapEditor from '@/components/molecules/tiptap/TiptapEditor';
import useTiptapStore from '@/store/useTiptap.store';

const TestPage = () => {
  const content = useTiptapStore((state) => state.content);
  const setContent = useTiptapStore((state) => state.setContent);
  return (
    <div className='relative w-full h-full'>
      <TiptapEditor content={content} setContent={setContent} />
    </div>
  );
};

export default TestPage;
