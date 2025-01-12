import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import TiptapBubbleMenu from './TiptapBubbleMenu';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';
import useTiptapStore from '@/store/useTiptap.store';
import { useEffect } from 'react';

const TiptapEditor = () => {
  const content = useTiptapStore((state) => state.content);
  const setContent = useTiptapStore((state) => state.setContent);
  const editor: Editor | null = useCreateTiptapEditor(setContent);

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  return (
    <div className='relative w-full h-full'>
      <EditorContent editor={editor} />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      {/* <div className='mt-4 bg-red-500'>
        <h3>Current Content:</h3>
        <pre>{content}</pre>
      </div> */}
    </div>
  );
};

export default TiptapEditor;
