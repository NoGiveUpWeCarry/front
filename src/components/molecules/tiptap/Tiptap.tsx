import { EditorContent } from '@tiptap/react';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import { tiptapDditor } from '@/hooks/tiptap/useEditor.hook';

const TiptapEditor = () => {
  return (
    <div className='relative'>
      <EditorContent editor={tiptapDditor} className='border p-4' />
      {tiptapDditor && <TiptapFloatingMenu editor={tiptapDditor} />}
    </div>
  );
};

export default TiptapEditor;
