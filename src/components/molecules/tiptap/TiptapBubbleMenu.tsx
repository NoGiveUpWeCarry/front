import { BubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import {
  LinkIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
} from '@heroicons/react/24/outline';
import '@/styles/bubbleMenu.css';

interface TiptapBubbleMenuProps {
  editor: Editor | null;
}

const menuItems = [
  {
    label: '굵게',
    icon: BoldIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive('bold'),
  },
  {
    label: '기울임꼴',
    icon: ItalicIcon,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive('italic'),
  },
  {
    label: '취소선',
    icon: StrikethroughIcon,
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
  },
  {
    label: '링크',
    icon: LinkIcon,
    action: (editor: Editor) => {
      const previousUrl = editor.getAttributes('link').href;
      const url = prompt('링크 URL을 입력하세요:', previousUrl || 'https://');
      if (url === null) {
        return; // 사용자가 취소 버튼을 누른 경우
      }
      if (url === '') {
        editor.chain().focus().unsetLink().run(); // URL이 빈 값일 경우 링크 해제
        return;
      }
      editor.chain().focus().setLink({ href: url }).run();
    },
    isActive: (editor: Editor) => editor.isActive('link'),
  },
];

const TiptapBubbleMenu = ({ editor }: TiptapBubbleMenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'bottom',
        offset: [0, 8],
      }}
      className='bubble-menu'
    >
      <div className='flex flex-col'>
        {menuItems.map(({ label, icon: Icon, action, isActive }, index) => (
          <button
            key={index}
            onClick={() => action(editor)}
            className={`flex items-center px-3 py-2 w-full text-left hover:bg-gray-100 ${
              isActive(editor) ? 'is-active' : ''
            }`}
          >
            <Icon className='w-4 h-4 mr-2' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </div>
    </BubbleMenu>
  );
};

export default TiptapBubbleMenu;
