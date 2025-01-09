import { EditorContent } from '@tiptap/react';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import TiptapBubbleMenu from './TiptapBubbleMenu';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';

const TiptapEditor = () => {
  const editor = useCreateTiptapEditor();
  return (
    <div className='relative'>
      <EditorContent editor={editor} className='border p-4' />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
    </div>
  );
};

export default TiptapEditor;
