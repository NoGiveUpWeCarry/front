import { FloatingMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import '@/styles/floatingMenu.css';
import FloatingMenuItems from '@/constants/FloatingMenuItems';

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
        {FloatingMenuItems.map(
          ({ label, icon: Icon, action, isActive }, index) => (
            <button
              key={index}
              onClick={() => action(editor)}
              className={isActive(editor) ? 'is-active' : ''}
            >
              <Icon className='w-4 h-4 mr-1 inline-block' />
              <span className='text-sm'>{label}</span>
            </button>
          )
        )}
      </div>
    </FloatingMenu>
  );
};

export default TiptapFloatingMenu;
