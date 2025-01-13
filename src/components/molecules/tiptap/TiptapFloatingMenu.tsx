import { FloatingMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import {
  CheckCircleIcon,
  ListBulletIcon,
  CodeBracketIcon,
  HashtagIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import '@/styles/floatingMenu.css';

interface TiptapFloatingMenuProps {
  editor: Editor | null;
}

const menuItems = [
  {
    label: '제목1',
    icon: HashtagIcon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    label: '제목2',
    icon: HashtagIcon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    label: '글머리 기호',
    icon: ListBulletIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
  },
  {
    label: '번호 매기기',
    icon: CheckCircleIcon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
  },
  {
    label: '코드 블록',
    icon: CodeBracketIcon,
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive('codeBlock'),
  },
  {
    label: '이미지',
    icon: PhotoIcon,
    action: (editor: Editor) => {
      const url = prompt('이미지 url을 입력해주세요.');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
    isActive: () => false,
  },
];

const TiptapFloatingMenu = ({ editor }: TiptapFloatingMenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'bottom-start',
        arrow: false,
        theme: 'dark',
        offset: [0, 5],
      }}
      className='floating-menu'
    >
      <div className='flex flex-col'>
        {menuItems.map(({ label, icon: Icon, action, isActive }, index) => (
          <button
            key={index}
            onClick={() => action(editor)}
            className={isActive(editor) ? 'is-active' : ''}
          >
            <Icon className='w-4 h-4 mr-1 inline-block' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </div>
    </FloatingMenu>
  );
};

export default TiptapFloatingMenu;
