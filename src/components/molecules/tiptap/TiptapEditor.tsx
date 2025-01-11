import { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import TiptapBubbleMenu from './TiptapBubbleMenu';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';

const TiptapEditor = () => {
  const [content, setContent] = useState<string>('');
  const editor: Editor | null = useCreateTiptapEditor(setContent);

  return (
    <div className='relative w-100%'>
      <EditorContent editor={editor} className='p-4' />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
    </div>
  );
};

export default TiptapEditor;
