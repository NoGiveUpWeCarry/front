import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import TiptapFloatingMenu from './TiptapFloatingMenu';
import TiptapBubbleMenu from './TiptapBubbleMenu';
import { useCreateTiptapEditor } from '@/hooks/tiptap/useEditor.hook';
import useTiptapStore from '@/store/useTiptap.store';

const TiptapEditor = () => {
  // Zustand 스토어에서 상태와 액션 가져오기
  const content = useTiptapStore((state) => state.content);
  const setContent = useTiptapStore((state) => state.setContent);
  const editor: Editor | null = useCreateTiptapEditor(setContent);

  return (
    <div className='relative w-100% h-100%'>
      <EditorContent editor={editor} className='p-4' />
      {editor && <TiptapFloatingMenu editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      <div className='mt-4'>
        <h3>Current Content:</h3>
        <pre>{content}</pre> {/* Zustand에서 가져온 content를 표시 */}
      </div>
    </div>
  );
};

export default TiptapEditor;
