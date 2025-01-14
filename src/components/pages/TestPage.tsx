import TiptapEditor from '@/components/organisms/TiptapEditor';
import useTiptapStore from '@/store/tiptapStore';

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
