import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';
import TiptapBubbleMenu from '@/components/molecules/tiptap/TiptapBubbleMenu';
import TiptapFloatingMenu from '@/components/molecules/tiptap/TiptapFloatingMenu';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TiptapEditor = ({ content, setContent }: TiptapEditorProps) => {
  const editor: Editor | null = useCreateTiptapEditor(setContent, content);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleEditorClick = () => {
    if (editor) {
      editor.commands.focus();
    }
  };

  return (
    <div className='relative w-full h-full' onClick={handleEditorClick}>
      <EditorContent editor={editor} />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
    </div>
  );
};

export default TiptapEditor;
