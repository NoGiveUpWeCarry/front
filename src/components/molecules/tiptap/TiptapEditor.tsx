import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import TiptapBubbleMenu from './TiptapBubbleMenu';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TiptapEditor = ({ content, setContent }: TiptapEditorProps) => {
  const editor: Editor | null = useCreateTiptapEditor(setContent);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content); // 초기 콘텐츠 설정
      editor.commands.focus(); // 에디터 포커스
    }
  }, [editor, content]);

  return (
    <div className='relative w-full h-full'>
      <EditorContent editor={editor} />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
    </div>
  );
};

export default TiptapEditor;
