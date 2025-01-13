import { BubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import '@/styles/bubbleMenu.css';
import BubbleMenuItems from '@/constants/BubbleMenuItems';

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
        placement: 'bottom',
        offset: [0, 8],
      }}
      className='bubble-menu'
    >
      <div className='flex flex-col'>
        {BubbleMenuItems.map(
          ({ label, icon: Icon, action, isActive }, index) => (
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
          )
        )}
      </div>
    </BubbleMenu>
  );
};

export default TiptapBubbleMenu;
