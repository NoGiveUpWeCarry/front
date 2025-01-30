import { FloatingMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import '@/styles/floatingMenu.css';
import { usePostImage } from '@/hooks/queries/feed.query';
import { createFloatingMenuItems } from '@/constants/createFloatingMenuItems';

interface TiptapFloatingMenuProps {
  editor: Editor | null;
}

const TiptapFloatingMenu = ({ editor }: TiptapFloatingMenuProps) => {
  const { mutate: uploadImage } = usePostImage();
  const handleUploadImage = (file: File, editor: Editor) => {
    uploadImage(
      { file },
      {
        onSuccess: (data) => {
          editor.chain().focus().setImage({ src: data.imageUrl }).run();
        },
        onError: () => {
          alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };
  if (!editor) {
    return null;
  }

  const menuItems = createFloatingMenuItems(handleUploadImage);

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
