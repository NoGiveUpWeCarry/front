import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';
import TiptapBubbleMenu from '@/components/molecules/tiptap/TiptapBubbleMenu';
import { useEffect } from 'react';
import TiptapHubFloatingMenu from '@/components/molecules/tiptap/TiptapHubFloatingMenu';

interface TiptapEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TiptapHubEditor = ({ content, setContent }: TiptapEditorProps) => {
  const editor: Editor | null = useCreateTiptapEditor(setContent, content);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className='relative w-full h-full'>
      <EditorContent editor={editor} />
      {editor && <TiptapHubFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
    </div>
  );
};

export default TiptapHubEditor;
