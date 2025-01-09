import { BubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import '@/styles/bubbleMenu.css';

interface TiptapBubbleMenuProps {
  editor: Editor | null;
}

const TiptapBubbleMenu = ({ editor }: TiptapBubbleMenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'bottom', // 선택된 텍스트 바로 아래에 표시
        offset: [0, 8], // Y축으로 약간의 간격을 추가
      }}
      className='bubble-menu'
    >
      <div className='flex space-x-2'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <em>I</em>
        </button>

        {/* Code Block 버튼 */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <code>{`</>`}</code>
        </button>

        {/* Link 버튼 */}
        <button
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            const url = prompt(
              '링크 URL을 입력하세요:',
              previousUrl || 'https://'
            );
            if (url === null) {
              return; // 사용자가 취소 버튼을 누른 경우
            }
            if (url === '') {
              editor.chain().focus().unsetLink().run(); // URL이 빈 값일 경우 링크 해제
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          🔗
        </button>
      </div>
    </BubbleMenu>
  );
};

export default TiptapBubbleMenu;
