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
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          <HashtagIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>H1</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          <HashtagIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>H2</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <ListBulletIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>Bullet list</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <CheckCircleIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>Ordered list</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <CodeBracketIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>Code block</span>
        </button>
        <button
          onClick={() => {
            const url = prompt('이미지 url을 입력해주세요.');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className=''
        >
          <PhotoIcon className='w-4 h-4 mr-1 inline-block' />
          <span className='text-sm'>Image</span>
        </button>
      </div>
    </FloatingMenu>
  );
};

export default TiptapFloatingMenu;
